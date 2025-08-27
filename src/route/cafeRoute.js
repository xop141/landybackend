import express from 'express'
import getCafeLocation from '../resolvers/getCafeLocation.js'
import createCafe from '../resolvers/createCafe.js'
// import getCafe from '../resolvers/getCafe.js'
import getSpec from '../resolvers/getSpec.js'
import getCafeTest from '../resolvers/getCafeTest.js'
const route = express.Router()
route.post('/getLocation', getCafeLocation)
// route.post('/create', createCafe)
// route.get('/getCafe', getCafe)
route.get('/getSpec', getSpec)
route.get('/getCafe', getCafeTest)

export default route
