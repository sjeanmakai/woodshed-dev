const Session = require("../models/session");

module.exports = function (app, db) {
  // create session
  app.post("/sessions", async (req, res) => {
    try {
      const result = await Session.findOne({
        sessionDate: req.body.sessionDate
      });
      if (!result) {
        let session = new Session(req.body);
        const result = await session.save();
        res.status(200).json(result);
      } else {
        res.status(400).json({ message: "A session already exists on this date" });
      }
    } catch (err) {
      res.status(400).send("Unable to create the new session");
    }
  });
  // update session
  app.put("/sessions/:session_date", async (req, res) => {
    const query = { session_date: req.params.id };
    const update = {
      $set: {
        objectives: req.body.objectives,
        notes: req.body.notes,
        hours: req.body.hours,
        minutes: req.body.minutes,
      }
    };
    const options = { returnNewDocument: true };

    Session.findOneAndUpdate(
      query,
      update,
      options,
      function (err, result) {
        if (err) {
          res.status(500).json({ error: "An error occured" });
        } else if (!result) {
          res.status(404).json({ error: "No sessions found with this date" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  });
  // get sessions within date range
  app.get("/sessions/:author_id/:start_date/:end_date", async (req, res) => {
    const author_id = req.params.id;
    const start_date = req.params.start_date;
    const end_date = req.params.end_date;
    Session.find(
      {
        author: author_id,
        sessionDate: {
          $gte: start_date,
          $lt: end_date,
        },
      },
      function (err, result) {
        if (err) {
          res.status(500).json({ error: "An error occured" });
        } else if (!result) {
          res.status(404).json({ error: "No sessions found for this user" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  });
  // get sessions from one specific date
  app.get("/sessions/:author_id/:start_date", async (req, res) => {
    const author_id = req.params.id;
    const start_date = req.params.start_date;
    Session.find(
      {
        author: author_id,
        sessionDate: { $eq: start_date },
      },
      function (err, result) {
        if (err) {
          res.status(500).json({ error: "An error occured" });
        } else if (!result) {
          res
            .status(404)
            .json({ error: "No sessions found for this user on that date" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  });
};
