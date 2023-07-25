const express = require('express')
const cors = require('cors')
const app = express()

const createId = require('./helper/createId')
const temp_task = require('./tasks')

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


let tasks = [...temp_task]


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

    let page = Number(req.query.page)

    if(!page) page = 1

    const totalTask = tasks.length
    
    const limit = 10    
    // const startIndex = (page - 1) * limit

    //INDEX DARI DATA TERBARU
    let startIndex = totalTask - ((page-1) * limit) - limit
    let endIndex = startIndex + limit

    if (startIndex < 0) {
        startIndex = 0
    }

    const totalPage = Math.ceil(tasks.length / limit)

    const result = tasks.slice(startIndex, endIndex).sort((a, b) => b.id - a.id)
    // console.log(result)

    res.status(200).json({
        currentPage : page,
        totalPage : totalPage,
        data : result
    })
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

    const deletedTask = tasks[taskIndex]

    tasks.splice(taskIndex, 1)

    res.status(200).json({ message: `${deletedTask.title} has been removed`})
})



app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})