// database setup and routing

const { PrismaClient } = require('@prisma/client');
const express = require('express')
const session = require('express-session')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const store = new session.MemoryStore();

let currentUser = "";

app.use(cors());

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests

app.use(session({ // middleware for setting up sessions
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
    store
  }));

// creates a new account
app.post("/create", async (req, res) => {
    const {user, password} = req.body; // takes username and password
    bcrypt.hash(password, saltRounds, async function(err, hashed) { // hashes password
        try {
        await prisma.user.create({ // creates a new user by storing username and hashed password
            data: {
                user,
                hashedPassword: hashed
            }
        });
        req.session.user = user
        currentUser = req.session.user; // sets current user
        res.status(200).json({});
    } catch (e) {
        res.status(500).json({"error": e.message});
    }
    })
})

// login to existing account
app.post("/login", async (req, res) => {
    const {user, password} = req.body; // takes username and password
    const userRecord = await prisma.user.findUnique({ // finds account matching given username
        where: {user}
    });
    bcrypt.compare(password, userRecord.hashedPassword, function(err, result) { // compares to hashed password
        if (result) {
            req.session.user = user
            req.session.authenticated = true;
            currentUser = req.session.user; // sets current user if successful
            res.status(200).json();
        } else {
            res.status(500).json({"error": err});
        }
    })
})

// logs current user out
app.post("/logout", async (req, res) => {
    req.session.authenticated = false;
    req.session.destroy();
    currentUser = "";
})

// gets current user data
app.get('/user/data', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { user: currentUser},
        include: {
            exSearches: {
                orderBy: {
                    id: 'desc',
                }
            },
            exTypes: {
                orderBy: {
                    id: 'desc',
                }
            },
            muscles: {
                orderBy: {
                    id: 'desc',
                }
            },
            difficulties: {
                orderBy: {
                    id: 'desc',
                }
            }
        },
    }
);
    res.status(200).json(user);
});

// create a workout for a specific user
app.post('/user/workout', async (req, res) => {
    const {id, title, description, username} = req.body;
    const newWorkout = await prisma.workout.create({
        data: {
            id,
            title,
            description,
            username
        }
    })
    res.status(201).json(newWorkout)
});

// create a meal plan for a specific user
app.post('/user/plan', async (req, res) => {
    const {id, title, description, username} = req.body;
    const newPlan = await prisma.plan.create({
        data: {
            id,
            title,
            description,
            username
        }
    })
    res.status(201).json(newPlan)
});

// get all workouts for the specified user
app.post('/workouts', async (req, res) => {
    const { user } = req.body;

    const workouts = await prisma.workout.findMany({
        where: {
            username: user,
        },
    });
    res.json(workouts)
}); 

// get all workouts for the users
app.post('/friends/workouts', async (req, res) => {
    const { users } = req.body;

    const workouts = await prisma.workout.findMany({
        where: {
            username: { in: users},
        },
    });
    res.json(workouts)
});

// get all plans for the specified user
app.post('/plans', async (req, res) => {
    const { user } = req.body;

    const plans = await prisma.plan.findMany({
        where: {
            username: user,
        },
    });
    res.json(plans)
}); 

// get all workouts for the users
app.post('/friends/plans', async (req, res) => {
    const { users } = req.body;

    const plans = await prisma.plan.findMany({
        where: {
            username: { in: users},
        },
    });
    res.json(plans)
});

// gets a workout with the given unique ID
app.get('/workout/:id', async (req, res) => {
    const { id } = req.params
    const workout = await prisma.workout.findUnique(
        {
            where: { id: parseInt(id) },
        });
        res.status(200).json(workout);
});

// retrieves a specific workout with data for copying
app.get('/friend/workout/:id', async (req, res) => {
    const { id } = req.params

    const workout = await prisma.workout.findUnique(
        {
            where: { id: parseInt(id) },
            include: {
                id: false,
                username: false,
            },
        });
    res.status(200).json(workout);
});

// add an exercise to a workout's exercise list
app.post('/workout/exercise', async (req, res) => {
    const { name, type, muscle,  equipment, difficulty, instructions, workoutID } = req.body;
    const newExercise = await prisma.exercise.create({
        data: {
            name,
            type,
            muscle,
            equipment,
            difficulty,
            instructions,
            workoutID,
            userID: currentUser
        }
    })
    const updatedCurrent = await prisma.user.update({
        where: {user: currentUser},
        data: {
            recentAdds: {connect: newExercise},
        }
    })
    let current = await prisma.user.findUnique({
        where: {user: currentUser},
        include: {
            recentAdds: true,
        }
    })
    if (current.recentAdds.length >= 3){
        const updated = await prisma.user.update({
            where: {user: currentUser},
            data: {
                recentAdds: {
                    disconnect: current.recentAdds[0]
                },
            }
        })
    }
    res.status(201).json(newExercise)
});

// get the exercises that were added to workouts most recently by the current user
app.get('/recent/exercises', async (req, res) => {
    const current = await prisma.user.findUnique({
        where: {user: currentUser},
        include: {
            recentAdds: true,
        }
    })
    res.json(current.recentAdds)
}); 

// fetches exercises for the workout with the given id
app.get('/workout/:id/exercises', async (req, res) => {
    const { id } = req.params

    const workout_exercises = await prisma.exercise.findMany({
        where: {
            workoutID: parseInt(id),
        },
    });
    res.json(workout_exercises)
}); 

// gets all exercise names associated with a user
app.get('/exercises', async (req, res) => {
    const exercises = []

    const workouts = await prisma.workout.findMany({
        where: {
            username: currentUser,
        },
    });

    for (let i = 0; i < workouts.length; i++){
        const workout_exercises = await prisma.exercise.findMany({
            where: {
                workoutID: parseInt(workouts[i].id),
            },
        });
        for (let i = 0; i < workout_exercises.length; i++){
            exercises.push(workout_exercises[i].name)
        }
    }
    res.json(exercises)
});

// gets a meal plan with the given unique ID
app.get('/plan/:id', async (req, res) => {
    const { id } = req.params
    const plan = await prisma.plan.findUnique(
        {
            where: { id: parseInt(id) },
        });
        res.status(200).json(plan);
});

// add a meal to a plan's meal list
app.post('/plan/meal', async (req, res) => {
    const { name, planID } = req.body;
    const newMeal = await prisma.meal.create({
        data: {
            name,
            planID
        }
    })
    res.status(201).json(newMeal)
});

// fetches meals for the plan with the given id
app.get('/plan/:id/meals', async (req, res) => {
    const { id } = req.params

    const plan_meals = await prisma.meal.findMany({
        where: {
            planID: parseInt(id),
        },
    });
    res.json(plan_meals)
}); 

// gets the current signed in user 
app.get('/profile', async (req, res) => {
    res.status(200).json(currentUser);
});

// searches for users whose names match the current user's search
app.get('/users/query/:query', async (req, res) => {
    const { query } = req.params
    const foundUser = await prisma.user.findUnique({
        where: { user: query}
    });
    res.status(200).json(foundUser);
});

// sends a request from the current user to the given user and updates request fields
app.put('/friends/send', async (req, res) => {
    const { targetName } = req.body;
    const newFriend = await prisma.user.findUnique({
        where: { user: targetName}
    });
    const updatedCurrent = await prisma.user.update({
        where: {user: currentUser},
        data: {
            sent: {connect: newFriend}
        }
    })
    res.status(200).json(updatedCurrent);
});

// cancels a sent request and updates request fields
app.put('/friends/cancel', async (req, res) => {
    const { targetName } = req.body;
    const canceled = await prisma.user.findUnique({
        where: { user: targetName}
    });
    const updatedCurrent = await prisma.user.update({
        where: {user: currentUser},
        data: {
            sent: {disconnect: canceled}
        }
    })
    res.status(200).json(updatedCurrent);
});

// accepts a received friend request and updates request and friend fields
app.put('/friends/accept', async (req, res) => {
    const { targetName } = req.body;
    const newFriend = await prisma.user.findUnique({
        where: { user: targetName}
    });
    const updatedCurrent = await prisma.user.update({
        where: {user: currentUser},
        data: {
            friends: {connect: newFriend},
            friendOf: {connect: newFriend},
            received: {disconnect: newFriend}
        }
    })
    res.status(200).json(updatedCurrent);
});

// denies a received friend request and updates request fields
app.put('/friends/deny', async (req, res) => {
    const { targetName } = req.body;
    const denied = await prisma.user.findUnique({
        where: { user: targetName}
    });
    const updatedCurrent = await prisma.user.update({
        where: {user: currentUser},
        data: {
            received: {disconnect: denied}
        }
    })
    res.status(200).json(updatedCurrent);
});

// removes a friend and updates friend fields
app.put('/friends/remove', async (req, res) => {
    const { targetName } = req.body;
    const removed = await prisma.user.findUnique({
        where: { user: targetName}
    });
    const updatedCurrent = await prisma.user.update({
        where: {user: currentUser},
        data: {
            friends: {disconnect: removed},
            friendOf: {disconnect: removed},
        }
    })
    res.status(200).json(updatedCurrent);
});

// retrieves all request and friend lists for the current user
app.get('/friendlist', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { user: currentUser},
        include: {
            sent: true,
            received: true,
            friends: true,
        },
    });
    res.status(200).json(user);
});

// adds a new exercise search to a user's kept history
app.put('/search/exercise', async (req, res) => {
    const { newSearchIn, typeIn, muscleIn, difficultyIn } = req.body;
    const newSearch = await prisma.search.create({
        data: {
            content: newSearchIn,
            username: currentUser
        }
    })
    const type = await prisma.type.create({
        data: {
            content: typeIn,
            username: currentUser
        }
    })
    const muscle = await prisma.muscle.create({
        data: {
            content: muscleIn,
            username: currentUser
        }
    })
    const difficulty = await prisma.difficulty.create({
        data: {
            content: difficultyIn,
            username: currentUser
        }
    })
    let updatedCurrent = await prisma.user.findUnique({
        where: {user: currentUser}
    })
    res.status(200).json(updatedCurrent);
})

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});