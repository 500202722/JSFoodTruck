//TACOS QUERYSELECTOR
const tacoList = document.querySelector(".tacoslist")

//GET THE TACOS USING API ROUTE
const getTaco = async () => {
    const response = await fetch('/api/v1/menu')
    return await response.json()
}

//SHOW AND DISPLAY TACO LIST
const tacoLists = async () => {
    const tacos = await getTaco()
    tacos.forEach(({id, name, description, price, image}) => {
        if(!name || !description || !price || !image){
            return;
        }
        else{
            const tacoItem = document.createElement("div")

            //STYLE THE TACO ELEMENT
            tacoItem.className = "taco-display"
            tacoItem.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}>"<br>
            <p><strong>Description:</strong> ${description}</p><br>
            <p><strong>Price:</strong> $${price}</p>`;

            tacoList.appendChild(tacoItem)
        }
    })
}

//ELEMENT QUERYSELECTOR
const eventListing = document.querySelector(".eventslist");

//GET THE EVENTS USING API ROUTE
const getEvent = async () => {
    const response = await fetch('/api/v1/events')
    return await response.json()
}

//SHOW AND DISPLAY EVENTS LIST
const eventLists = async () => {
    const events = await getEvent()
    events.forEach(({ _id, name, date, time }) => {
        if(!name || !date || !time){
            return;
        }
        else{
            const eventItem = document.createElement("div")

            //STYLE THE EVENT ELEMENT
            eventItem.className = "event-display"
            eventItem.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p><br><br>
            `
            eventItem.onclick = () => {
                window.location.href = `/event/${_id}`
            }
            eventListing.appendChild(eventItem)
        }
    })
}

//EVENT ELEMENT PAGE
const eventElements = {
    name: document.getElementById('eventName'),
    location: document.getElementById('eventLocation'),
    date: document.getElementById('eventDate'),
    time: document.getElementById('eventTime')
}

//GET THE EVENTS ID USING API ROUTE
const getEvents = async id => {
    const response = await fetch(`/api/v1/events/${id}`)
     return await response.json()
}

//DISPLAY ID CONTENT INTO EVENTS PAGE
const eventpage = async () => {
    const { pathname } = window.location
    const [, route, id] = pathname.split('/')

    if(route === 'event' && id) {
        const {name, location, date, time} = await getEvents(id)

        //Display taco details
        eventElements.name.textContent = name
        eventElements.location.textContent = location
        eventElements.date.textContent = date
        eventElements.time.textContent = time
    }
}

//LOAD THE PAGE
document.addEventListener("DOMContentLoaded", () => {
    tacoLists()
    eventLists()
    eventpage()
})


//ADMIN PAGE - TACO
const tacoForm = document.getElementById('newRecipes')
const tacoName = document.getElementById('tname')
const description = document.getElementById('description')
const price = document.getElementById('price')
const image = document.getElementById('image')

//ADDING TO THE TACO FORM
tacoForm.addEventListener('submit', async e => {
    e.preventDefault()

    const newTacoData = {
        name: tacoName.value.trim(),
        description: description.value.trim(),
        price: price.value.trim(),
        image: image.value.trim()
    }

    //ENSURE ALL SPOT IS FILLED IN THE FORM
    if (!tacoName || !description || !price || !image) {
        return
    }

    //CONNECT TO THE API - POST
    const response = await fetch('/api/v1/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTacoData)
    })
    
    if(response.ok) {
        tacoForm.reset()
        window.location.href = '/'
    }else {
        return
    }

})

//ADMIN PAGE - EVENT
const eventForm = document.getElementById('newEvents')
const eventName = document.getElementById('ename')
const eventLocation = document.getElementById('location')
const eventDate = document.getElementById('date')
const eventTime = document.getElementById('time')

//ADDING TO THE EVENT FORM
eventForm.addEventListener('submit', async e => {
    e.preventDefault()

    const newEventData = {
        name: eventName.value.trim(),
        location: eventLocation.value.trim(),
        date: eventDate.value.trim(),
        time: eventTime.value.trim()
    }

    //ENSURE ALL SPOT IS FILLED
    if (!eventName || !location || !date || !time) {
        return
    }

    //CONNECT TO THE API - POST
    const response = await fetch('/api/v1/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEventData)
    })
    
    if(response.ok) {
        eventForm.reset()
        window.location.href = '/'
    }else {
        return
    }
})

