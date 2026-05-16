import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: String, required: true }, // e.g., "Algorithms"
    year: { type: Number, required: true },      // e.g., 3 for 3rd Year
    bio: { type: String, required: true }        // Brief mentorship description
});

export default mongoose.model("mentors", mentorSchema);