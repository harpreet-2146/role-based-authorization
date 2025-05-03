const express=require("express");
const router=express.Router();

//only admin can access this router
router.get("/admin", (req, res) => {
    res.send("Admin access granted");
});
//both admin and manager can access this router
router.get("/manager", (req, res) => {
    res.send("Manager access granted");
});

//all can access this router
router.get("/user", (req, res) => {
    res.send("User access granted");
});

module.exports=router;