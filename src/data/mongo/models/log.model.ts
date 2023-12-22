import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["low", "medium", "high", "critical"],
    default: "low",
  },
  message: { type: String, required: true },
  origin: { type: String },
  createdAt: { type: Date, default: new Date() },
});

export const LogModel = mongoose.model("Log", logSchema);
