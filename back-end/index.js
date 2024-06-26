// database setup and routing

const { PrismaClient } = require('@prisma/client');
const express = require('express')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(cors());

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
            res.status(200).json({});
        } else {
            res.status(500).json({"error": err});
        }
    })
})


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});