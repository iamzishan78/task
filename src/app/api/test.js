import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
