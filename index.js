const express=require('express');
require('dotenv').config(); 
const dbConnect=require('./config/dbConnect');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes'); 

dbConnect();

const app=express();

//Middleware
app.use(express.json());

//Routers
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
//Start the server
const PORT=process.env.PORT || 7001;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});


