const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname, '..', 'public')


router.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

router.get('/event/:id', (request, response) => {
    response.sendFile('events.html', { root })
})

module.exports = router