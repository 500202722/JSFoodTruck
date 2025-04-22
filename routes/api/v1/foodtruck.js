const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let menuCollection = null
let eventsCollection = null

const getMenu = async () => {
    if (!menuCollection) menuCollection = await getCollection('FoodTruckAPI', 'Menu')
    return menuCollection
}
const getEvents = async () => {
    if (!eventsCollection) eventsCollection = await getCollection('FoodTruckAPI', 'Events')
    return eventsCollection
}

router.get('/menu', async (request, response) => {
    const menuCollection = await getMenu()
    const found = await menuCollection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find any menu items.` }})
})

router.get('/events', async (request, response) => {
    const eventsCollection = await getEvents()
    const found = await eventsCollection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find any events.` }})
})

router.get('/menu/:id', async (request, response) => {
    const { id } = request.params
    const menuCollection = await getMenu()
    const found = await menuCollection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find a menu item with id: ${id}` }})
})

router.get('/events/:id', async (request, response) => {
    const { id } = request.params
    const eventsCollection = await getEvents()
    const found = await eventsCollection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find an event with id: ${id}` }})
})

router.post('/menu', async (request, response) => {
    const { name, description, price, image } = request.body
    const menuCollection = await getMenu()
    const { acknowledged, insertedId } = await menuCollection.insertOne({ name, description, price, image })
    response.send({ acknowledged, insertedId })
})

router.post('/events', async (request, response) => {
    const { name, location, date, time } = request.body
    const eventsCollection = await getEvents()
    const { acknowledged, insertedId } = await eventsCollection.insertOne({ name, location, date, time })
    console.log({ acknowledged, insertedId })
    response.send({ acknowledged, insertedId })
})

module.exports = router