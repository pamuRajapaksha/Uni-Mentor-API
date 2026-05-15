import express from "express";
import { create, fetch, update, deleteMentor } from "../controller/mentorController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteMentor);

export default route;