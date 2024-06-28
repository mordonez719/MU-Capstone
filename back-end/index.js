// database setup and routing

const { PrismaClient } = require('@prisma/client');
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuid = require('uuid').v4


// const { Sequelize } = require('sequelize');
// const { sequelize } = new Sequelize('workouts', 'postgres', 'M@os102899', {
//     host: 'localhost',
//     dialect: 'postgres'
//   });
// const SequelizeStoreInit = require ('connect-session-sequelize');


// app.use(express.json());

// app.use(cors({
//     origin: `http://localhost:${PORT}`,
//     credentials: true
// }));

app.use(cors());

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests

// app.use(morgan('combine'))

// const SequelizeStore = SequelizeStoreInit(session.Store);
// const sessionStore = new SequelizeStore({
//   db: sequelize
// });

// app.use(
//     session({
//       secret: 'your-secret-key',
//       resave: false,
//       saveUninitialized: false,
//       store: sessionStore,
//       cookie: {
//         sameSite: false,
//         secure: false,
//         expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
//       }
//     })
//   );
//   sessionStore.sync();

const sessions = {};

// app.use(
//     session({
//       secret: 'your-secret-key',
//       resave: false,
//       saveUninitialized: false,
//       store: sessionStore,
//       cookie: {
//         sameSite: false,
//         secure: false,
//         expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
//       }
//     })
//   );
//   sessionStore.sync();

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
        const sessionId = uuid();
            sessions[sessionId] = { user };
            res.cookie('session-cookie', user, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: false,
                // secure: true,
                // sameSite: 'strict'
        })
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
            const sessionId = uuid();
            sessions[sessionId] = { user };
            res.cookie('session-cookie', user, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: false,
                // secure: true,
                // sameSite: 'strict'
            })
            // res.set('Set-Cookie', `session=${sessionId}`);
            res.status(200).json({});
        } else {
            res.status(500).json({"error": err});
        }
    })
})

app.post("/logout", async (req, res) => {
    res.clearCookie('session-cookie');
    // res.redirect('/login');
})

// sequelize.sync({ alter: true })
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`App is listening on port ${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.error('Unable to connect to the database:', error);
//   });


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});