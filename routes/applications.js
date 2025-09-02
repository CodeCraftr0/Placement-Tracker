// backend/routes/applications.js (Mongo version)
const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { company, role, status, notes } = req.body;
    if (!company || !role) {
      return res.status(400).json({ error: "company and role are required" });
    }
    const doc = await Application.create({ company, role, status, notes });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const { q, status } = req.query; // optional filters later
    const filter = {};
    if (q) filter.$or = [
      { company: new RegExp(q, "i") },
      { role: new RegExp(q, "i") }
    ];
    if (status) filter.status = status;
    const docs = await Application.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one
router.get("/:id", async (req, res) => {
  try {
    const doc = await Application.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: "invalid id" });
  }
});

// UPDATE (partial)
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const doc = await Application.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Application.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: "invalid id" });
  }
});

module.exports = router;