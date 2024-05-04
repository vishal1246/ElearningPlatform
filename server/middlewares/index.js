//if valid user give the req.user._id else throw error
var { expressjwt: jwt } = require("express-jwt");
import User from "../models/user";
import Course from "../models/course";
export const requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: function (req, res) {
    // console.log(req);
    return req.cookies.token;
  },
});

export const isInstructor = async (req, res, next) => {
  try {
    const ID = req.auth._id;
    console.log(ID);
    const user = await User.findById(ID).exec();
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).exec();
    const course = await Course.findOne({ slug: req.params.slug }).exec();

    // check if course id is found in user courses array
    let ids = [];
    for (let i = 0; i < user.courses.length; i++) {
      ids.push(user.courses[i].toString());
    }

    if (!ids.includes(course._id.toString())) {
      res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
