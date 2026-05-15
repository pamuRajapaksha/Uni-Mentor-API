import Mentor from "../model/mentorModel.js";


export const create = async (req, res) => {
    try {
        const mentorData = new Mentor(req.body);
        const { email } = mentorData;
        const mentorExist = await Mentor.findOne({ email });
        if (mentorExist) {
            return res.status(400).json({ message: "Mentor already exists." });
        }
        const savedMentor = await mentorData.save();
        res.status(200).json(savedMentor);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const fetch = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        if (mentors.length === 0) {
            return res.status(404).json({ message: "No mentors found." });
        }
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
