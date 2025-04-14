const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtsController {
  static async showThoughts(req, res) {
    res.render("thoughts/home");
  }
};
