const Blog = require("../models/Blogs");
const User = require("../models/User");

exports.showUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("blogs").exec();

    if(!users){
        return res.json({
            success:false,
            message:"No Users Found"
        })
    }

    return res.json({
      success: true,
      message: "All Users Fetched",
      users: users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Can't fetch users",
      error:error.message
    });
  }
};
