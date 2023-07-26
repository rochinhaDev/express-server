import express from "express";
import notesModel from "../models/notes.model.js";
import userModel from "../models/user.model.js";
const notesRouter = express.Router();
notesRouter.post("/create-note/:id_user", async (req, res) => {
  try {
    const id_user = req.params.id_user;
    console.log(req.body);
    const newNote = await notesModel.create({
      ...req.body,
      user: id_user,
    });
    const addNote = await userModel.findByIdAndUpdate(id_user, {
      $push: { notes: newNote._id },
    });
    return res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
notesRouter.get("/all-notes", async (req, res) => {
  const allNotes = await notesModel
    .find({})
    .populate({
      path: "user",
      select: { username: 1, age: 1, _id: 0 },
    })
    .select({ title: 1, _id: 0 });
  return res.status(200).json(allNotes);
});
export default notesRouter;
