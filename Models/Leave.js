import mongoose from "mongoose";
const schema = mongoose.Schema;

//crate leave model class
const LeaveSchema = new schema(
  {
    emp_id: {
      type: String,
      required: true,
    },
    emp_leaves_count: {
      type: String,
      required: true,
    },
    emp_leaves_type: {
      type: String,
      required: true,
    },
    emp_leaves_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("leave", LeaveSchema);
