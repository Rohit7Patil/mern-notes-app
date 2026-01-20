import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller\n", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNote controller\n", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, description } = req.body;
    const note = new Note({
      title: title,
      description: description,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller\n", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found!" });
    }

    res.status(200).json({ message: "Note Updated Successfully" });
  } catch (error) {
    console.error("Error in updateNote controller\n", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found!" });
    }

    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller\n", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
