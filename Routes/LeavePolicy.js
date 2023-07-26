import express from "express";
import {
  AddLeavePolicy,
  displayPolicy,
  updateLeaveCount,
  deletePolicy,
  LeavePolicyReport,
} from "../Controllers/LeavePolicy.js";
const router = express.Router();

router.post("/add", AddLeavePolicy);
router.get("/get", displayPolicy);
router.put("/update/:id", updateLeaveCount);
router.delete("/delete", deletePolicy);
router.get("/policyreport", LeavePolicyReport);

export default router;
