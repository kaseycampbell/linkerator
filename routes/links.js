const express = require("express");
const linksRouter = express.Router();

const { getAllLinks, createLink } = require("../db");

//use state setUser in react to store username and id.
//pass in id as :userId in fetch/axios request
//requireUser
linksRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const links = await getAllLinks(userId);
    res.send(links);
  } catch (error) {
    next(error);
  }
});

//cannot post without crea
linksRouter.post("/:userId", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    console.log("\n".repeat(20));
    console.log(title, url);
    console.log("\n".repeat(20));
    const { userId } = req.params;
    const date = new Date();
    console.log({ date });
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

module.exports = linksRouter;
