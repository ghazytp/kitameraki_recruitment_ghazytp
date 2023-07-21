
let idCounter = 1
const createId = () => {
    return idCounter++
}

module.exports = createId