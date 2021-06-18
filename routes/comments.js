const express = require("express");
const commentsRouter = express.Router();
const { requireUser } = require("./utils");

const { createComment } = require("../db");

//get creatorId from req.user.id
commentsRouter.post("/:linkId", requireUser, async (req, res, next) => {
  const { linkId } = req.params;
  const { body } = req.body;
  const creatorId = req.user.id;
  try {
    const comment = await createComment({ creatorId, linkId, body });
    res.send(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
