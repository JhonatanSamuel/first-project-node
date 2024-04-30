const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')

const cors = require('cors') 

const port = process.env.PORT || 3001
const app = express()
app.use(express.json())

app.use(cors())


/*
    GET            => Buscar informações no back-end
    POST           => Criar informações no back-end
    PUT / PATCH    => Alterar/atualizar informações no back-end
    Delete         => Deletar informações no back-end

    Middleware     => INTERCEPTADOR => Tem o poder de parar ou alteerar dados da requisição
*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params 

    const index = users.findIndex(user => user.id === id) 

    if (index < 0) { 
        return response.status(404).json({ message: "User not found" })
    }
    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {
    return response.json(users) // para retornar todos os usuários criados
})

app.post('/users', (request, response) => { 
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user) 
    return response.status(201).json(user) 
})

app.put('/users/:id', checkUserId, (request, response) => {
    
    const { name, age } = request.body

    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age } 

    //find - encontra ainformação dentro do array e me retorna a informação
    //findIndex - retorna o locar do array onde está a informação
    // caso não encontre ele retorna -1
  

    users[index] = updateUser // vou no meu array de usuários na posição que encontrei e atualizo

    return response.json(updateUser) // para retornar todos os usuários criados
})

app.delete('/users/:id', checkUserId, (request, response) => { // vou pegar o id do usuário
    //const { id } = request.params
    const index = request.userIndex
  
    users.splice(index, 1) //consigo deletar partes do array a partir de um índice
    //quero deletar a posição encontrada no index, e soment eles, por isso o 1

    return response.status(204).json() // starus 204 é sem conteúdo
})





app.listen(port, () => {
    console.log(`Porta ${port} Atualizado com sucesso, ta de parabéns!!`)
})