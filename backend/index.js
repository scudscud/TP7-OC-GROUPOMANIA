const express = require('express')
const app = express()

//
require('dotenv').config({path:'./config/.env'})
// const { Nuxt, Builder} = require('nuxt')
// const config = require('../nuxt.config')
// config.dev = !('nuxt'=== 'production')

// async  function start(){

//     const nuxt = new Nuxt(config)
//     const {host,port}= nuxt.option.server 

//     if (config.dev){
//         const builder = new Builder(nuxt)
//         await builder.build()
//     }else{
// await nuxt.ready()
//     }
// app.use(nuxt.render)
// app.listen(port,host)

// console.ready({
//     message: `ok on  http://${host}:{port}`,
//     badge: true


// })



// }
// start()


app.listen(process.env.PORT,()=>console.log(`listening on port ${process.env.PORT}`))