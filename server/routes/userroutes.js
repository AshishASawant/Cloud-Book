const express = require("express");
const router = express.Router();
const User = require("../models/Usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretkey='try to hack this'
const fetchdata=require('../middleware/middleware')

//signing up a new user using :POST http://localhost:5000/api/users/signup
router.post(
  "/signup",
  [
    //express validator
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name must be of minimum 3 characters").isLength({ min: 3 }),
    body("password", "Password must be of minimum 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false});
    }

    //if the input is correct:try
    try {
      // check if the user with this email already exists
      let register = await User.findOne({ email: req.body.email });
      if (register) {
        return res.json({msg:"User with this email already exists",success:false});
      }
      

      //securing the user password using hashing ad salt
      const salt = await bcrypt.genSalt(10);
      const phash = await bcrypt.hash(req.body.password, salt);

      //if email does not exists create a new user
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: phash,
      }).then((user) => {

        //creating a token for the user
        const token = jwt.sign({id:user.id}, jwtSecretkey);

        res.json({ msg: "User is successfully registered",success:true,token});
      });

    } catch (error) {
      res.json({msg:"Internal server error",success:false})
      console.log(error);
    }
  }
);

//loging in a user using his email and password using a post request: http://localhost:5000/api/users/login
router.post('/login',body("email","Enter a valid email").isEmail(),async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(),success:false });
  }

  try {
    let loginuser=await User.findOne({email:req.body.email})
    //if the user doesnot exists
    if(!loginuser){
      return res.send({msg:'User with this email does not exists',success:false})
    }

    //comparing the password using bycrypt
    let authuser=await bcrypt.compare(req.body.password,loginuser.password)

    // if the user is authentic send a authtoken
    if (authuser){
      let token=jwt.sign({id:loginuser.id},jwtSecretkey)
      res.json({success:'true',token})
    }
    else{
      res.json({msg:"Please login with correct credentials",success:false})
    }

  } catch (error) {
    console.log(errors)
    res.json({msg:"Internal server error",success:false})
  }
})

// fetching the user data using post request : http://localhost:5000/api/users/fetchuserdata
router.post('/fetchuserdata',fetchdata,async(req,res)=>{
  try {
    //this came from the middelware
    userid=req.userid

    //finding the user details
    let userauth=await User.findOne({id:userid}).select('-password')
    res.json(userauth)
  } catch (error) {
    console.log(error)
    res.send("Internal server error")

  }
})
module.exports = router;
