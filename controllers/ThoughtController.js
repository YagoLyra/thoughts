const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtsController {
  static async showThoughts(req, res) {
    res.render("thoughts/home");
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: { id: userId },
      include: Thought,
      plain: true,
    });

    if (!user) {
      res.redirect("/login");
      return;
    }

    const thoughts = user.Thoughts.map((result) => result.dataValues);

    let emptyThoughts = false;

    if (thoughts.length === 0) {
      emptyThoughts = true;
    }

    res.render("thoughts/dashboard", { thoughts, emptyThoughts });
  }

  static createThought(req, res) {
    res.render("thoughts/create");
  }

  static async createThoughtSave(req, res) {
    const thought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Thought.create(thought);
      req.flash("message", "Pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async removeThought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Thought.destroy({ where: { id: id, UserId: UserId } });
      req.flash("message", "Pensamento removido com sucesso!");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateThought(req, res) {
    const id = req.params.id;
    const thought = await Thought.findOne({ where: { id: id }, raw: true });

    res.render("thoughts/edit", { thought });
  }

  static async updateThoughtSave(req, res) {
    const id = req.body.id;
    const thought = {
      title: req.body.title,
    };

    try {
      await Thought.update(thought, { where: { id: id } });
      req.flash("message", "Pensamento atualizado com sucesso!");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (err) {
      console.log(err);
    }
  }
};
