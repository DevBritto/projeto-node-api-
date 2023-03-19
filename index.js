const express = require('express')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})


const users = []

app.get('/users', (request, response) => {
    const { name, age } = request.body
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    //console.log(uuid.v4())

    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const updateUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }

    users[index] = updateUser

    return response.json(updateUser)
 
}) 

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }

    users.splice(index,1)

    return response.status(204).json(users)

})

app.patch('/users:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const index = users.findIndex(user => user.id === id)
    console.log('Pedido finalizado')

    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }

    users.splice(index,1)

    return response.status(204).json({message: "Pedido finalizado"})

})    

      