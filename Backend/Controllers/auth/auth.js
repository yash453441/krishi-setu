const User = require("../../Models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { isEmail, isStrongPassword } = require("validator");

// Updated regex patterns for validation
const validationRegex = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: {
    minLength: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*]/
  },
  phone: /^[0-9]{10}$/,
  pincode: /^[0-9]{6}$/,
  name: /^[a-zA-Z\s]{2,30}$/
};

//SignUp Controller

const signup = async (req, resp) => {
  try {
    const { username, password: userpassword } = req.body;

    // Validate required fields
    if (!username || !userpassword) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Email and password are required" 
      });
    }

    // Validate email format
    if (!validationRegex.email.test(username)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Please enter a valid email address" 
      });
    }

    // Validate password
    if (!validationRegex.password.minLength.test(userpassword)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Password must be at least 8 characters long" 
      });
    }

    if (!validationRegex.password.uppercase.test(userpassword)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Password must contain at least one uppercase letter" 
      });
    }

    if (!validationRegex.password.lowercase.test(userpassword)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Password must contain at least one lowercase letter" 
      });
    }

    if (!validationRegex.password.number.test(userpassword)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Password must contain at least one number" 
      });
    }

    if (!validationRegex.password.specialChar.test(userpassword)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Password must contain at least one special character (!@#$%^&*)" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Email is already registered" 
      });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(userpassword, 10);
    const user = new User({ 
      username, 
      password: hashedPassword 
    });
    
    await user.save();

    // Generate token and send response
    const { password, ...userData } = user._doc;
    const token = jwt.sign({ _id: user._id }, process.env.JWTTOKENKEY);
    
    return resp.status(201).json({
      status: "true",
      message: "Account created successfully",
      token,
      others: userData
    });

  } catch (err) {
    console.error("Signup error:", err);
    return resp.status(500).json({ 
      status: "false", 
      message: "An error occurred during signup. Please try again." 
    });
  }
};

//SignIn Controller

const signin = async (req, resp) => {
  try {
    const { username } = req.body;
    const userpassword = req.body.password;

    //validations

    if (!username || !userpassword)
      resp
        .status(400)
        .json({ status: "false", message: "Fill all the necessary fields" });

    const user = await User.findOne({ username });
    if (!user)
      resp.status(404).json({ status: "false", message: "User Not Found" });

    const isCorrectPassword = await bcrypt.compare(userpassword, user.password);
    if (!isCorrectPassword)
      resp
        .status(401)
        .json({ status: "false", message: "Invalid Credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWTTOKENKEY);
    const { password, ...others } = user._doc;
    //console.log(others);
    resp
      .status(200)
      .json({ status: "true", message: "Login Success", token, others });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ status: "false", message: err });
  }
};

//Update Controller
const updateUser = async (req, resp) => {
  const { _id, firstname, lastname, address, pincode, phonenumber, username } =
    req.body;

  try {
    // Validate required fields
    if (!firstname || !lastname || !address || !pincode || !phonenumber) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Fill all necessary Details" 
      });
    }

    // Validate name format
    if (!validationRegex.name.test(firstname) || !validationRegex.name.test(lastname)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Please enter valid first and last names (letters only, 2-30 characters)" 
      });
    }

    // Validate phone number
    if (!validationRegex.phone.test(phonenumber)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Please enter a valid 10-digit phone number" 
      });
    }

    // Validate pincode
    if (!validationRegex.pincode.test(pincode)) {
      return resp.status(400).json({ 
        status: "false", 
        message: "Please enter a valid 6-digit pincode" 
      });
    }

    const response = await User.updateOne(
      { _id },
      {
        $set: {
          firstname,
          lastname,
          address,
          pincode,
          phonenumber,
          isUpdate: true,
        },
      }
    );

    if (!response) {
      return resp.status(500).json({ 
        status: "false", 
        message: "Internal Server Error" 
      });
    }

    return resp.status(200).json({ 
      status: "true", 
      message: "Profile Updated Successfully" 
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).json({ 
      status: "false", 
      message: err.message || "Internal Server Error" 
    });
  }
};

//IsAuthenticated Controller

const isAuthenticated = async (req, resp) => {
  try {
    const userdata = await User.findById(req.user._id);
    const { password, ...others } = userdata._doc;

    if (!userdata)
      resp
        .status(404)
        .json({ status: "false", message: "You are not logged in..." });

    resp.status(200).json({
      success: "true",
      message: "You are Authenticated",
      others,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ status: "false", message: err });
  }
};

//Get User

const getUser = async (req, resp) => {
  const { _id } = req.body;
  try {
    const user = await User.findById({ _id });
    const { password, ...others } = user._doc;
    if (!user)
      resp.status(409).json({ status: "false", message: "User not Found" });

    resp.status(200).json({ status: "true", message: "User Found", others });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ status: "false", message: err });
  }
};

module.exports = { signup, signin, isAuthenticated, updateUser, getUser };
