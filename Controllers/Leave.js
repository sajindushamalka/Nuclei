import User from "../Models/User.js";
import Leave from "../Models/Leave.js";

//Request Leaves function
export const RequestLeaves = async (req, res) => {
  const id = req.params.id;

  //get user from id
  const user = await User.findById(id);

  console.log(user);
  if (user) {
    //if user are exiting, get the available leaves
    const emp_leaves = user.emp_leaves;
    if (emp_leaves != "0") {
      //if leaves not eqaul 0 , allows to request leaves
      //create new leave object
      const newLeave = new Leave({
        emp_id: user.emp_id,
        emp_leaves_count: req.body.emp_leaves_count,
        emp_leaves_status: "Requested",
        emp_leaves_type: req.body.emp_leaves_type,
      });
      const newLev = await newLeave.save();
      res.status(201).json({
        message: "Leave Requested",
      });
    } else {
      res.status(500).json({
        message: "No Leaves are available",
      });
    }
  } else {
    res.status(500).json({
      message: "User are not found",
    });
  }
};

//View Leave balance
export const leaveBalance = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (user) {
    const leaves = user.emp_leaves;
    res.status(200).send({ message: "Leave fetch", payload: leaves });
  } else {
    res.status(500).send({
      message: "User not found",
    });
  }
};

//track the leave status
export const trackLeave = async (req, res) => {
  const id = req.params.id;
  //Get leave object by using leave id
  const leave = await Leave.findById(id);
  if (leave) {
    //if leave are avilable display leave status
    res.status(200).send({
      message: "Leave status fetch",
      payload: leave.emp_leaves_status,
    });
  } else {
    //if not display error
    res.status(500).send({ message: "Leave status not found" });
  }
};

//Update Leave Status
export const updateLeaveStatus = async (req, res) => {
  const id = req.params.id;
  //Get leave object by using leave id
  const leave = await Leave.findById(id);
  //get the status of the leave
  const status = req.body.emp_leaves_status;
  //check the status
  if (status == "Accept") {
    const emp_id = leave.emp_id;
    const emp_leaves_count = leave.emp_leaves_count;
    const emp_leaves_status = "Accept";
    const emp_leaves_type = leave.emp_leaves_type;
    //if accept, update the exiting leave object, status property to accept
    const updateLeave = {
      emp_id,
      emp_leaves_count,
      emp_leaves_status,
      emp_leaves_type,
    };

    const updatedLeaves = await Leave.findByIdAndUpdate(id, updateLeave, {
      new: true,
    });

    if (updatedLeaves) {
      //after update the leave stuats, update the user object exiting leaves

      const user = await User.findOne({ emp_id: leave.emp_id });

      //get current available leaves, need leaves and get the total new availble leavs
      const preCount = parseInt(user.emp_leaves);
      const currentLeave = parseInt(emp_leaves_count);
      const newAvaLeaves = preCount - currentLeave;
      console.log(newAvaLeaves);

      const uid = user._id;
      const emp_id = user.emp_id;
      const emp_name = user.emp_name;
      const emp_password = user.emp_password;
      const emp_type = user.emp_type;
      const emp_leaves = newAvaLeaves;

      const updateUser = {
        emp_id,
        emp_name,
        emp_password,
        emp_type,
        emp_leaves,
      };

      //update new availbe leaves
      const updatedUser = await User.findByIdAndUpdate(uid, updateUser, {
        new: true,
      });

      if (updatedUser) {
        res.status(200).send({ message: "Leave status updated successfully" });
      } else {
        res.status(500).send({ message: "User leave status not updated" });
      }
    } else {
      res.status(500).send({ message: "Leave Not updated" });
    }
  } else if (status == "Reject") {
    //if reject, update leave status to the reject
    const emp_id = leave.emp_id;
    const emp_leaves_count = leave.emp_leaves_count;
    const emp_leaves_status = "Reject";
    const emp_leaves_type = leave.emp_leaves_type;

    const updateLeave = {
      emp_id,
      emp_leaves_count,
      emp_leaves_status,
      emp_leaves_type,
    };

    const updatedLeaves = await Leave.findByIdAndUpdate(id, updateLeave, {
      new: true,
    });

    if (updatedLeaves) {
      res.status(200).send({ message: "Leave reject successfully" });
    } else {
      res.status(500).send({ message: "Error in leave rejecting" });
    }
  } else {
    res.status(500).send({ message: "Error" });
  }
};

//For Reporting
//Get average number of leave in per year
export const leaveUsageReport = async (req, res) => {
  //get all emplyees
  const leaves = await User.find();
  let sum = 0;
  let noEmp = 0;

  //using for loop get the emp_meavers value and calculate the total no of leaves each employee got.
  leaves.forEach((leave) => {
    sum = sum + (10 - parseInt(leave.emp_leaves));
    noEmp++;
  });

  console.log(sum);
  console.log(noEmp);

  const averageLeave = sum / noEmp;

  if (averageLeave) {
    res.status(200).send({ payload: averageLeave });
  } else {
    res.status(500).send({ message: "Error in calculeting average" });
  }
};

//For Report
//Get all employees availble leaves count
export const eachEmployeeLeaves = async (req, res) => {
  //get all users
  const users = await User.find();
  const array = {};

  //Add emp id and leaves count to the array
  users.forEach((user) => {
    array[user.emp_id] = user.emp_leaves;
  });

  if (array) {
    res
      .status(200)
      .send({ message: "All Employee available leaves", payload: array });
  } else {
    res.status(500).send({ message: "Error in getting leaves" });
  }
};

//For Report
//Get all employees leaves use count
export const eachEmployeeLeavesBalances = async (req, res) => {
  //get all users
  const users = await User.find();
  const array = {};

  //Add emp id and leaves count to the array
  users.forEach((user) => {
    array[user.emp_id] = 10 - parseInt(user.emp_leaves);
  });

  if (array) {
    res
      .status(200)
      .send({ message: "All Employee leaves balances", payload: array });
  } else {
    res.status(500).send({ message: "Error in getting leaves" });
  }
};
