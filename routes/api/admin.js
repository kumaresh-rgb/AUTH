const express = require('express')
const bcrypt = require('bcryptjs')
const router  = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check,validationResult}=require('express-validator')



router.get('/',auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  }catch(err){
    console.err(err.message);
    re.status(500).send("server Error");
  }

})
router.post('/',[
 
  check('email', 'please include a valid email').isEmail() ,
  check('password','password is required').exists()
],  async(req, res) =>  {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }


  // check user exixts
const {email,password}=req.body;
try {

  // todo if user exist
  let user = await User.findOne({email})

  if(!user){
    return res.status(400).json({errors:[{msg:" Invalid Crendetials"}]});
  }
  
  
  
  const isMatch = await bcrypt.compare(password,user.password);

 if(!isMatch){
  return res.status(400).json({errors:[{msg:" Invalid crendetial"}]})
}  

  

 //todo jsonwebtoken
 const payload={user:{id:user.id}};

jwt.sign(payload,config.get('jwtSecret'),
    // option expires and so on ..;
{expiresIn:36000},
(err,token) => {
   if (err) throw err;
   res.json({token});
  });


} catch (err) {
  console.error(err.message)
  res.status(500).json("server error");

}

  

})


module.exports=router