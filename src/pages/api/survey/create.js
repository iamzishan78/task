// Import necessary modules
import mongoose from 'mongoose';
import Survey from '../../../../models/Survey'; // Import the Survey model

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return; // If already connected, do nothing
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

// API route handler
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        await connectToDatabase(); // Ensure MongoDB connection
  
        // Extract survey data from the request body
        const { email, status, progress } = req.body;
  
        // Validate the required fields
        if (!email || !status || !progress) {
          return res.status(400).json({ message: "Missing required fields" });
        }
  
        // Check if a survey with this email already exists
        let survey = await Survey.findOne({ email });
  
        if (survey) {
          // If a survey exists, update it with the new data
          survey.status = status;
          survey.progress = progress;
  
          await survey.save();
  
          return res.status(200).json({
            message: "Survey updated successfully!",
            survey,
          });
        } else {
          // If no survey exists, create a new one
          const newSurvey = new Survey({
            email,
            status,
            progress,
          });
  
          await newSurvey.save();
  
          return res.status(201).json({
            message: "Survey created successfully!",
            survey: newSurvey,
          });
        }
      } catch (error) {
        console.error("Error creating/updating survey:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  
