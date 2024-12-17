const express = require("express");
const router = express.Router();
const { Location } = require("../models");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
