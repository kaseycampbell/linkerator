const express = require("express");
const commentsRouter = express.Router();
const {requireUser} = require('./utils')


const {createComment} = require('../db')


//get creatorId from req.user.id
commentsRouter.post('/:linkId', requireUser, async (req, res, next) => {
  const {linkId} = req.params;
  const {body} = req.body;
  // const creatorId = req.user.id;
  const creatorId = 2;
  try {
    const comment = await createComment({creatorId, linkId, body})
    console.log({comment});
    res.send(comment);
  } catch (error) {
    next(error);
  }
})

module.exports = commentsRouter;