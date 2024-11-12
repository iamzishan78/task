import mongoose from "mongoose";
import Survey from "../../../../../models/Survey";

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

// POST handler
export async function POST(request) {
  try {

   
    await connectToDatabase(); // Ensure MongoDB connection

    // Extract survey data from the request body
    const { email, status, progress } = await request.json();

    // Validate the required fields
    if (!email || !status || !progress) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if a survey with this email already exists
    let survey = await Survey.findOne({ email });

    if (survey) {
      // If a survey exists, update it with the new data
      survey.status = status;
      survey.progress = progress;

      await survey.save();

      return new Response(
        JSON.stringify({
          message: "Survey updated successfully!",
          survey,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // If no survey exists, create a new one
      const newSurvey = new Survey({
        email,
        status,
        progress,
      });

      await newSurvey.save();

      return new Response(
        JSON.stringify({
          message: "Survey created successfully!",
          survey: newSurvey,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error creating/updating survey:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Optional: Handle unsupported methods
export function OPTIONS() {
  return new Response(null, {
    status: 405,
    headers: { Allow: "POST" },
  });
}
