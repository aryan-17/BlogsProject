const Blogs = require("../models/Blogs");
const User = require("../models/User");

exports.getBlogs = async (req, res) => {
  try {
    const { name } = req.body;
    const userToSearch = await User.findOne({ name });

    if (!userToSearch) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    const blogsForUser = await Blogs.findById(userToSearch);

    if (!blogsForUser) {
      return res.json({
        success: false,
        message: "No Blogs Found for Selected User",
      });
    }

    return res.json({
      success: true,
      message: "Blogs Found",
      blogs: blogsForUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in finding blogs ",
      error: error.message,
    });
  }
};

exports.showAllBlogs = async (req, res) => {
  try{

    const allBlogs = await Blogs.find({});

    if(!allBlogs){
      return res.json({
        success:false,
        message:"No blogs Found",
      })
    }

    return res.json({
      success:true,
      message:"Blogs Found",
      blogs:allBlogs
    })
  }
  catch(error){
    return res.json({
      success:false,
      message:"Error",
      error:error.message
    })
  }

};

exports.addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    console.log(req.user);

    if (req.user.role !== "Admin") {
      return res.json({
        success: false,
        message: "You are not authorized to publish any Blogs",
      });
    }

    const publishedBlog = await Blogs.create({
      user: req.user.id,
      title: title,
      content: content,
    });

    const admin = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { blogs: publishedBlog._id } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Added Blog",
      blog: publishedBlog,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to add Blog",
      error: error.message,
    });
  }
};
