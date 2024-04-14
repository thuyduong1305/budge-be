import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "Amount",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
  })
);
