import express from "express";
import {
  UserRegister,
  Signin,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../Controllers/User.js";
const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", Signin);
router.get("/all", getAllUsers);
router.get("/one/:id", getOneUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
