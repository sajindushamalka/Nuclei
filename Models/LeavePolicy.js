import mongoose from "mongoose";
const schema = mongoose.Schema;

//crate leave policy model class
const LeavePolicySchema = new schema(
  {
    leave_id: {
      type: String,
      required: true,
      primaryKey: true,
    },
    leaves_type: {
      type: String,
      required: true,
    },
    Leaves_per_year: {
      type: String,
      required: true,
    },
    leave_eligibility_criteria: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("leave-policy", LeavePolicySchema);
