const express = require('express')
const cors = require('cors')
const app = express()

const createId = require('./helper/createId')

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


let tasks = []


app.get('/', (req, res) => {
    res.send({
        date: new Date(),
        status: 200,
        message: 'KITAMERAKI_TASK_MANAGEMENT_BACKEND_CONNECTED',
    })
})


// CREATE TASK
app.post('/tasks', (req, res) => {
    const newTask = {id : createId(), ...req.body}
    tasks.push(newTask)

    res.status(200).json({ message: `New task '${newTask.title}' has been created`})
})


// READ ALL TASK
app.get('/tasks', (req, res) => {

    res.status(200).json(tasks)
})

// READ ONE TASK
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)

    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) return res.status(404).json({message: 'TASK_NOT_FOUND'})

    res.status(200).json(tasks[taskIndex])
})

// UPDATE ONE TASK
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const newInput = req.body

    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) return res.status(404).json({message: 'TASK_NOT_FOUND'})

    const updatedTask = { ...tasks[taskIndex], ...newInput}

    tasks[taskIndex] = updatedTask

    res.status(200).json({ message: `Task with id ${updatedTask.id} has been updated` })
})


// DELETE ONE TASK
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)

    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) return res.status(404).json({message: 'TASK_NOT_FOUND'})

    tasks.splice(taskIndex, 1)

    res.status(200).json(tasks)
})



app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})