const express = require('express')
const secureRouter = require('./routes/secure-pay.routes')
const cors = require('cors')


const app = express()
const PORT = 3000

app.use('/v1/secure-pay', secureRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT,()=>{
    console.log("App listening on port ")
})