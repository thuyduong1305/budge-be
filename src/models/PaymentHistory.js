import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "PaymentHistory",
  new Schema(
    {
      id: { type: ObjectId },
      name: {
        type: String,
        required: true,
      },
      image: { type: String, required: true },
      date: { type: Date, required: true },
      money: { type: Number, required: true },
      type: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  )
);
