const express = require('express')

const { SetupRoutes } = require('../../internal/controller/controller')
const { DBConnector } = require('../../internal/db/db')
const { Repository } = require('../../internal/repository/repository')
const { Service } = require('../../internal/service/service')
const app = express()
const host = 'localhost'
const port = 8000

app.use(express.json())

db=new DBConnector("templates.json")

repo=new Repository(db)

service=new Service(repo)

router=SetupRoutes(service)

app.use('/templates', router)

app.listen(port, host, () => {
	console.log(`Сервер запущен по адресу http://${host}:${port}`)
})
