const express = require('express');
const linksRouter = express.Router();


//use state setUser in react to store username and id.
//pass in id as :userId in fetch/axios request
linksRouter.get('/links', async (req, res, next) => {
  try {
    const links = await getAllLinks(2);
    res.send(links);
  } catch (error) {
    next(error);
  }
})

module.exports = linksRouter;