const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnection, sendMessage } = require('../websocket')

async function index(request, response){
    const devs = await Dev.find()

    return response.json(devs)
}

async function store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({github_username})

    if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        const { name = login, avatar_url, bio } = apiResponse.data
        const techsArray = parseStringAsArray(techs)
    
        const location = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

        const sendSocketMessageTo = findConnection({latitude, longitude}, techsArray)
        sendMessage( sendSocketMessageTo, 'new-dev', dev )

    }

    console.log( dev )
    return response.json( dev )
}

async function update(request, response){
    const { techs, latitude, longitude } = request.body
    const { id } = request.params

    const dev = await Dev.findOne({_id: id})
    dev.techs = parseStringAsArray( techs )
    dev.location = {
        type: "Point",
        coordinates: [ latitude, longitude ]
    }

    await dev.save()

    return response.json( dev )
}

async function show(request, response){
    const { id } = request.params

    const dev = await Dev.findOne({_id: id})

    return response.json( dev )
}

async function destroy(request, response){
    const { id } = request.params

    await Dev.deleteOne({ _id: id })

    index(request, response)

}

module.exports = { index, store, update, show, destroy }