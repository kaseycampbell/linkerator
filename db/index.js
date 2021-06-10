// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/linkerator";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

// database methods

//methods to create
//getAllLinks
//getTagsById
//getAllTags
//createLink
//createTag
//destroyLink
//destroyTag
//getSortedLinks

//

const createUser = async ({ username, password }) => {
  const hashedPassword = await hashPassword(password);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password) VALUES ($1, $2)
      RETURNING id, username;
    `,
      [username, hashedPassword]
    );
    console.log("user row", user);
    return user;
  } catch (error) {
    throw error;
  }
};

const createLink = async ({ creatorId, title, url, clickCount, date }) => {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    INSERT INTO links("creatorId", title, url, "clickCount", date) VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [creatorId, title, url, clickCount, date]
    );
    return link;
  } catch (error) {
    console.error(error);
  }
};

const createComment = async ({ linkId, body }) => {
  try {
    const {
      rows: [comment],
    } = await client.query(
      `
    INSERT INTO comments("linkId", body) VALUES ($1, $2) RETURNING *;
    `,
      [linkId, body]
    );
    return comment;
  } catch (error) {
    console.error(error);
  }
};

const createTag = async ({ linkId, tagName }) => {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
    INSERT INTO tags("linkId", "tagName") VALUES ($1, $2) RETURNING *;
    `,
      [linkId, tagName]
    );
    return tag;
  } catch (error) {
    console.error(error);
  }
};

//util functions
async function hashPassword(password) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  return hashedPassword;
}

// export
module.exports = {
  client,
  // db methods
  createUser,
  createLink,
  createComment,
  createTag,
};
