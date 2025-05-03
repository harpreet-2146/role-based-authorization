const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/userModel");
const register=async(req,res)=>{
    const { username, password,role} = req.body;

  try {
    // 🔐 Hash the password first
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 🧑‍💻 Create the user with hashed password
    const user = new User({
      username,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err.toString() });
  }
};


const login = async (req, res) => {
     try{   
    const { username, password } = req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({
                message:`user with username ${username} not found`
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:`invalid credentials`
            })
        }
        const token=jwt.sign({
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET,
    {expiresIn:"1d"});
    console.log("Generated Token: ", token); 
    res.status(200).json({token})
    }catch(err){
            res.status(500).json({
                message:`something went wrong ${err}`
            });
        }
};
       

module.exports={
  register,
    login
}