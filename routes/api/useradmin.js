const express = require('express')
const bcrypt = require('bcryptjs')
const router  = express.Router()
const {check,validationResult}=require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/',[
  check('name','Name is Required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail() ,
  check('password','please Enter a password 6 r more characters').isLength({min:6})
],  async(req, res) =>  {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }


  // check user exixts
const {name,email,password}=req.body;
try {

  // todo if user exist
  var user = await User.findOne({email})

  if(user){
    return res.status(400).json({errors:[{msg:"   User already exists"}]});
  }
  //todo  get user  gravatar
  const avatar = gravatar.url(email,{s:"200",r:"pg",d:"mm"})

  user=new User({ name,email,avatar,password})

  //todo Encrypt password

  const salt = await bcrypt.genSalt(10)

  user.password =await bcrypt.hash(password,salt)

  await user.save()

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
  res.status(500).send("server error");

}

  

})

module.exports=router;


