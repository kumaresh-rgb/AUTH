const express = require('express')
const router  = express.Router()
 


router.get('/', (req, res) => {
    res.send('this is userpost js')
  })


module.exports=router