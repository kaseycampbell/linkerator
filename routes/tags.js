const express = require("express");
const tagsRouter = express.Router();
const { requireUser } = require("./utils");
const { createTag, destroyTag } = require("../db");

tagsRouter.post("/:linkId", requireUser, async (req, res, next) => {
  const { linkId } = req.params;
  const { tagName } = req.body;
  const { id } = req.user;
  try {
    const tag = await createTag({
      creatorId: id,
      linkId,
      tagName,
    });
    res.send(tag);
    return tag;
  } catch (error) {
    next(error);
  }
});

tagsRouter.delete("/:tagId", requireUser, async (req, res, next) => {
  const { tagId } = req.params;
  try {
    const tag = await destroyTag(tagId);
    res.send(tag);
  } catch (error) {
    next(error);
  }
});

module.exports = tagsRouter;
