// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

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

// export
module.exports = {
  client,
  // db methods
}