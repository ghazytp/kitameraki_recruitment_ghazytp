const temp_task = require("../tasks")

let idCounter = temp_task.length > 1 ? temp_task.length + 1 : 1
const createId = () => {
    return idCounter++
}

module.exports = createId