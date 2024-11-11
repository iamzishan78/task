// models/Survey.js
import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
//   surveyId: {
//     type: Number,
//     unique: true, // Ensure it's unique
//     required: true, // Make it required
//   },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  progress: {
    type: mongoose.Schema.Types.Mixed, // JSONB-like structure
    required: true,
  },
});

export default mongoose.models.Survey || mongoose.model("Survey", SurveySchema);
