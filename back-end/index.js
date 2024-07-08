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

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
    store
  }));

// user authorization routing
app.post("/create", async (req, res) => {
    const {user, password} = req.body;
    bcrypt.hash(password, saltRounds, async function(err, hashed) {
        try {
        await prisma.user.create({
            data: {
                user,
                hashedPassword: hashed
            }
        });
        req.session.user = user
        currentUser = req.session.user;
        res.status(200).json({});
    } catch (e) {
        res.status(500).json({"error": e.message});
    }
    })
})

app.post("/login", async (req, res) => {
    const {user, password} = req.body;
    const userRecord = await prisma.user.findUnique({
        where: {user}
    });
    bcrypt.compare(password, userRecord.hashedPassword, function(err, result) {
        if (result) {
            req.session.user = user
            req.session.authenticated = true;
            currentUser = req.session.user;
            res.status(200).json();
        } else {
            res.status(500).json({"error": err});
        }
    })
})

app.post("/logout", async (req, res) => {
    req.session.authenticated = false;
    req.session.destroy();
    currentUser = "";
})


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

// get all workouts for the current user
app.post('/workouts', async (req, res) => {
    const { user } = req.body;

    const workouts = await prisma.workout.findMany({
        where: {
            username: user,
        },
    });
    res.json(workouts)
}); 

// get all workouts for the current user
app.post('/plans', async (req, res) => {
    const { user } = req.body;

    const plans = await prisma.plan.findMany({
        where: {
            username: user,
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

// gets a meal plan with the given unique ID
app.get('/plan/:id', async (req, res) => {
    const { id } = req.params
    const plan = await prisma.plan.findUnique(
        {
            where: { id: parseInt(id) },
        });
        res.status(200).json(plan);
});

// gets the current signed in user 
app.get('/profile', async (req, res) => {
    res.status(200).json(currentUser);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});