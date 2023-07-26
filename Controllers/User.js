import User from "../Models/User.js";
import jwt from "jsonwebtoken";
let refreshtokens = [];

//Create new user account
export const UserRegister = async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body.emp_id);
    //Check the employee id is availble
    const ExsistUser = await User.findOne({ emp_id: req.body.emp_id });
    console.log(!ExsistUser);
    //If the emp_id is not availble, display error
    if (ExsistUser) {
      res.status(404).json({
        message: "User Already registered..!",
      });
    } else if (!ExsistUser) {
      //else, create new employee profile
      const newUser = new User({
        emp_id: req.body.emp_id,
        emp_name: req.body.emp_name,
        emp_password: req.body.emp_password,
        emp_type: req.body.emp_type,
        emp_leaves: 10,
      });

      console.log(newUser);
      //save the new employee
      const newAcct = await newUser.save();
      if (newAcct) {
        //if successful registration, display the payload and sucess message
        res.status(201).json({
          message: "Registration Sucessfull..!",
          payload: newAcct,
        });
      } else {
        //else, display registration fail message
        res.status(400).json({
          message: "Somthing Went Wrong In Account Creating..!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

//User SignIn method
export const Signin = async (req, res) => {
  try {
    //get the user entred employee id
    const RegisterdUser = await User.findOne({ emp_id: req.body.emp_id });
    console.log(RegisterdUser);
    //Validate the employee
    if (RegisterdUser) {
      //if employee is validate
      const enterdPwd = req.body.emp_password; //get user entered password
      const dbPwd = RegisterdUser.emp_password; //get db password
      const uid = RegisterdUser._id;
      const empid = RegisterdUser.emp_id;
      //console.log(enterdPwd,dbPwd);
      //console.log(uid);
      //check the user emtered and db password are same
      if (enterdPwd === dbPwd) {
        //if it is same genorate jwt token to access the system
        const token = jwt.sign(
          { emp_id: req.body.emp_id },
          process.env.JWT_TOKEN_KEY,
          { expiresIn: "1h" }
        );
        //send the employee id and id in the payload and display successfull message
        res.status(201).json({
          mesage: "Login Successfull..!",
          token,
          payload: { uid, empid },
        });
      } else {
        //if passwords not match display this message
        res.status(401).json({
          message: "Incorrect Password..!",
        });
      }
    } else {
      //if employee id is not in the database display this message
      res.status(404).json({
        message: "User Not Registered..!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error..!",
      error: error,
    });
  }
};

//User sign out function
export const Signout = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshtokens = refreshtokens.filter((token) => token !== refreshToken);
    res.status(200).json({
      message: "Signout successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

//get all users function
export const getAllUsers = async (req, res) => {
  try {
    //fetch all users to the alluser variable
    const allusers = await User.find();
    if (allusers) {
      //display all user in the playload
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allusers,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Get one user from the database
export const getOneUser = async (req, res) => {
  try {
    //get the id of the user object
    let userId = req.params.id;
    //get the user
    const user = await User.findById(userId);
    if (user) {
      //if exiting user display details
      res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
};

//Update user details function
export const updateUser = async (req, res) => {
  const id = req.params.id;

  const emp_id = req.body.emp_id;
  const emp_name = req.body.emp_name;
  const emp_password = req.body.emp_password;
  const emp_type = req.body.emp_type;
  const emp_leaves = req.body.emp_leaves;

  const updateUser = {
    emp_id,
    emp_name,
    emp_password,
    emp_type,
    emp_leaves,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    if (updatedUser) {
      res
        .status(200)
        .send({ status: "User Details Updated", data: updatedUser });
    } else {
      res.status(404).send({ status: "User found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data" });
  }
};

//User delete function
export const deleteUser = async (req, res) => {
  let id = req.params.id;
  //get user from id
  await User.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ states: "User Deleted" });
    })
    .catch((err) => {
      res.states(500).send({ state: "Error with delete user" });
    });
};
