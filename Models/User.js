import mongoose from "mongoose";
const schema = mongoose.Schema;

//crate user model class
const UserSchema = new schema(
  {
    emp_id: {
      type: String,
      required: true,
    },
    emp_name: {
      type: String,
      required: true,
    },
    emp_password: {
      type: String,
      required: true,
    },
    emp_type: {
      type: String,
      required: true,
    },
    emp_leaves: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
