const express = require('express')
require('./db/mongoose')
const appCors = require('./helpers/appCors')
const userRouter = require('./routers/user')
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// Path for the following YAML.load is relative to root
// const swaggerDocument = YAML.load('./swagger.yaml');

const app = express()

app.use(appCors)
app.use(express.json())
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRouter)

module.exports = app