import express from "express";
import {
  RequestLeaves,
  leaveBalance,
  trackLeave,
  updateLeaveStatus,
  leaveUsageReport,
  eachEmployeeLeaves,
  eachEmployeeLeavesBalances,
} from "../Controllers/Leave.js";
const router = express.Router();

router.post("/request/:id", RequestLeaves);
router.get("/view/:id", leaveBalance);
router.get("/track/:id", trackLeave);
router.put("/update/:id", updateLeaveStatus);
router.get("/report", leaveUsageReport);
router.get("/eachOne", eachEmployeeLeaves);
router.get("/balance", eachEmployeeLeavesBalances);

export default router;
