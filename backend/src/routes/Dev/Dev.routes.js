import express from 'express'
const DevRoutes = express.Router()

//--------------------------------
//       AUTHENTICATION
//--------------------------------
DevRoutes.post('/create-new')
DevRoutes.post('/Log-In')

export default DevRoutes