const PORT = 8000
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const { contains } = require('cheerio');

const app = express()

const characters = [
    {
        address: 'https://us.streetfighter.com/characters/',
        range: "/5"
    }
]

app.get('/', (req, res) => {
    res.json('test')
})

let characterList = []

characters.forEach(character => {
    axios.get(character.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('.mix', html).each(function () {
                const portrait = $(this).find('img').attr('src')
                const name = $(this).find('h4').text()
                const subtitle = $(this).find('.portrait-tall').find('a').text()
                const power = $(this).attr('data-power')
                const health = $(this).attr('data-health')
                const mobility = $(this).attr('data-mobility')
                const technique = $(this).attr('data-technique')
                const range = $(this).attr('data-range')
                const officalLink = $(this).find('.portrait-tall').find('a').attr('href')

                characterList.push({
                    name,
                    subtitle,
                    portrait,
                    power: power + character.range,
                    health: health + character.range,
                    mobility: mobility + character.range,
                    technique: technique + character.range,
                    range: range + character.range,
                    officalLink
                })
            })
        })
})

app.get('/characters', async (req, res) => {
    res.json(characterList)
})

app.get('/characters/:characterId', async (req, res) => {
    const characterId = req.params.characterId
    // axios.get()
})

app.get('/moveList/', (req, res) => {
    res.json("Test")
})


app.listen(PORT, () => console.log(`'server running on ${PORT}'`))