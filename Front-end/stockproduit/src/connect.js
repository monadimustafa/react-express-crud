const { json, request, response } = require('express')
const express = require('express')
const app = express()
const port = 5000
//const cors = require('cors')
//const { Client } = require('pg')
app.use(express.json())
app.use(express.static('public'))
//app.use(express.urlencoded())
//app.use(cors())

