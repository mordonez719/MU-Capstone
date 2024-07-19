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
    });
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
    const { name, workoutID } = req.body;
    const newExercise = await prisma.exercise.create({
        data: {
            name,
            workoutID
        }
    })
    res.status(201).json(newExercise)
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

// gets all exercises associated with a user
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
    const { newSearch, type, muscle, difficulty } = req.body;
    let updatedCurrent = await prisma.user.findUnique({
        where: {user: currentUser}
    })
    if (updatedCurrent.exSearches.length < 5) { // if there are less than 5 recent searches, push a new one
        updatedCurrent = await prisma.user.update({
            where: {user: currentUser},
            data: {
                exSearches: {
                    "push": newSearch
                },
                exTypes: {
                    "push": type
                },
                muscles: {
                    "push": muscle
                },
                difficulties: {
                    "push": difficulty
                }
            }
        })
    } else { // if there are already five searches, keep the most recent four and add the new one
        updatedCurrent = await prisma.user.update({
            where: {user: currentUser},
            data: {
                exSearches: {
                    "set": [...updatedCurrent.exSearches.slice(1), newSearch]
                },
                exTypes: {
                    "set": [...updatedCurrent.exTypes.slice(1), type]
                },
                muscles: {
                    "set": [...updatedCurrent.muscles.slice(1), muscle]
                },
                difficulties: {
                    "set": [...updatedCurrent.difficulties.slice(1), difficulty]
                }
            }
        })
    }
    res.status(200).json(updatedCurrent);
})

// adds a new meal search to a user's kept history
app.put('/search/meal', async (req, res) => {
    const { newSearch, newDiets, newHealths, newTypes, min, max } = req.body;
    let updatedCurrent = await prisma.user.findUnique({
        where: {user: currentUser}
    })
    if (updatedCurrent.mealSearches.length < 5) { // if there are less than 5 recent searches, push a new one
        updatedCurrent = await prisma.user.update({
            where: {user: currentUser},
            data: {
                mealSearches: {
                    "push": newSearch
                },
                diets: {
                    "push": newDiets
                },
                healths: {
                    "push": newHealths
                },
                dishTypes: {
                    "push": newTypes
                },
                caloricMin: {
                    "push": min
                },
                caloricMax: {
                    "push": max
                }
            }
        })
    } else { // if there are already five searches, keep recent data and add new data
        updatedCurrent = await prisma.user.update({
            where: {user: currentUser},
            data: {
                mealSearches: {
                    "set": [...updatedCurrent.mealSearches.slice(1), newSearch]
                },
                diets: { // since you can check multiple diets, keep 4 recently selected instead of 4 sets
                    "set": [...updatedCurrent.diets.slice(-5), ...newDiets]
                },
                healths: {
                    "set": [...updatedCurrent.healths.slice(-5), ...newHealths]
                },
                dishTypes: {
                    "set": [...updatedCurrent.dishTypes.slice(-5), ...newTypes]
                },
                caloricMin: {
                    "set": [...updatedCurrent.caloricMin.slice(1), min]
                },
                caloricMax: {
                    "set": [...updatedCurrent.caloricMax.slice(1), max]
                }
            }
        })
    }
    res.status(200).json(updatedCurrent);
})

// retrieves user's recent exercise search history
app.post('/history/exercise', async (req, res) => {
    const {username} = req.body
    const user = await prisma.user.findUnique({
        where: { user: username}
    });
    res.status(200).json(user.exSearches);
});

// retrieves user's recent meal search history
app.post('/history/meal', async (req, res) => {
    const {username} = req.body
    const user = await prisma.user.findUnique({
        where: { user: username}
    });
    res.status(200).json(user.mealSearches);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});