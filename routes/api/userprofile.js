const express = require('express')
const router  = express.Router()
 


router.get('/', (req, res) => {res.send('This is userprofile js')})


module.exports=router;