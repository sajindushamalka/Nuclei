import LeavePolicy from "../Models/LeavePolicy.js";

//Add new leave policy
export const AddLeavePolicy = async (req, res) => {
  //Create auto increment id for policy id
  const PREFIX = "PID";
  const POLICYID = PREFIX + Date.now();

  //create new policy object
  const newPolicy = new LeavePolicy({
    leave_id: POLICYID,
    leaves_type: req.body.leaves_type,
    Leaves_per_year: req.body.Leaves_per_year,
    leave_eligibility_criteria: req.body.leave_eligibility_criteria,
  });

  //save the new policy object
  await newPolicy
    .save()
    .then(() => {
      res.status(200).send({ message: "New Policy Added" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in policy adding" });
    });
};

//Display all the policies
export const displayPolicy = async (req, res) => {
  const allPolicy = await LeavePolicy.find();
  if (allPolicy) {
    res.status(200).send({
      message: "Policy found",
      payload: allPolicy,
    });
  } else {
    res.status(404).send({ message: "Policy Not found" });
  }
};

//Update number of leaves per year
export const updateLeaveCount = async (req, res) => {
  const id = req.params.id;
  const updateCount = req.body.Leaves_per_year;

  //Get exiting leave policy
  const exitingPolicy = await LeavePolicy.findById(id);

  if (exitingPolicy) {
    //get exiting leave policy details
    const leave_id = exitingPolicy.leave_id;
    const leaves_type = exitingPolicy.leaves_type;
    const leave_eligibility_criteria = exitingPolicy.leave_eligibility_criteria;
    const Leaves_per_year = updateCount;

    const newUpdatePolicy = {
      leave_id,
      leaves_type,
      Leaves_per_year,
      leave_eligibility_criteria,
    };

    //update exiting policy
    await LeavePolicy.findByIdAndUpdate(id, newUpdatePolicy)
      .then(() => {
        res.status(200).send({ status: "Per year count updated" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error in updating" });
      });
  }
};

//Delete Policy
export const deletePolicy = async (req, res) => {
  const id = req.params.id;

  await LeavePolicy.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ message: "Policy deleted" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error in policy deleting" });
    });
};

//For report
//Get on of leave count of each leave type, and calulate total number leaves can get
export const LeavePolicyReport = async (req, res) => {
  const leavesPolicy = await LeavePolicy.find();
  const array = {};
  let count = 0;

  leavesPolicy.forEach((leave) => {
    array[leave.leaves_type] = leave.Leaves_per_year;
    count = count + parseInt(leave.Leaves_per_year);
  });

  if (array) {
    res
      .status(200)
      .send({
        message: "Leave policy report fetch successfully",
        payload: array,
        count: count,
      });
  } else {
    res.status(500).send({ message: "Report not found" });
  }
};
