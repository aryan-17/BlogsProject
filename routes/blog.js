const express = require("express");
const router = express.Router();

const {showAllBlogs, addBlog, getBlogs} = require("../controllers/blogController");
const{auth} = require("../middleware/auth");

router.post("/addBlog",auth,addBlog);
router.get("/getBlogs",getBlogs);
router.get("/showAllBlogs",showAllBlogs);

module.exports = router