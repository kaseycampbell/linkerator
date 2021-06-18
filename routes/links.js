const express = require("express");
const linksRouter = express.Router();
const { requireUser } = require("./utils");

const { getAllLinks, createLink, destroyLink } = require("../db");

//use state setUser in react to store username and id.
//pass in id as :userId in fetch/axios request
//requireUser

linksRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const links = await getAllLinks(userId);
    res.send(links);
  } catch (error) {
    next(error);
  }
});

//cannot post without crea
linksRouter.post("/:userId", requireUser, async (req, res, next) => {
  const { title, url } = req.body;
  const { userId } = req.params;
  const date = new Date();
  try {
    const link = await createLink({
      creatorId: userId,
      title: title,
      url: url,
      clickCount: 0,
      date: date,
    });
    res.send(link);
  } catch (error) {
    next(error);
  }
});

//destroys link and all comments and tags for link
linksRouter.delete("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const link = await destroyLink(id);
    res.send(link);
  } catch (error) {
    next(error);
  }
});

// linksRouter.patch("/:id", async (req, res, next) => {
//   const {id} = req.params;
//   const {}
//   try {
//     const link
//   } catch (error) {
//     next(error)
//   }
// });

module.exports = linksRouter;
