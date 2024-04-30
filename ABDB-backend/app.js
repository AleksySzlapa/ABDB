require('dotenv').config()

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const connectToDatabase = () => {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_DB);
}

const app = express()

app.use(cors())

app.use(bodyparser.json())

connectToDatabase()

const Jew = mongoose.model('todos', {
    age:{
        type: Number,
        required: true
    },
    time_spent:{
        type: Number,
        required: true
    },
    alive: {
        type: Boolean,
        default: true,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
});


app.get('/abdb', async (req, resp) => {
    resp.json(await Jew.find().exec())
})

app.get('/abdb/:id', async (req, resp) => {
    resp.json(await Jew.findById(req.params.id).exec())
})

app.post('/abdb', async (req, resp) => {
    try {
        const jew = new Jew(req.body)
        await jew.save()
        resp.status(201).json(jew)
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
})

app.put('/abdb/:id', async (req, resp) => {
    try {
        const student = await Jew.findByIdAndUpdate(req.params.id, req.body, { new: true })
        resp.status(200).json(student)
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
})

app.delete('/abdb/:id', async (req, resp) => {
    try {
        await Jew.findByIdAndDelete(req.params.id)
        resp.status(204).send()
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})