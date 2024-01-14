const express = require("express");
const router = express.Router();

const{showUsers} = require("../controllers/userController");
const{login,signUp} = require("../controllers/Auth");
const{auth,isStudent,isAdmin} = require("../middleware/auth");

router.get("/showUsers",showUsers);

router.post("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome Tester"
    })
})

router.post("/login",login);
router.post("/signUp",signUp);

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
      success: true,
      message: "Welcome Student",
    });
  });
  
  router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  });

module.exports = router;