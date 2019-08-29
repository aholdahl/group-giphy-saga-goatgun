const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  let queryText = `SELECT "favorite"."id", "favorite"."url", "category"."name" AS "category" FROM "favorite" LEFT JOIN "category" ON "favorite"."category_id" = "category"."id";`
  pool.query(queryText)
  .then((result)=>{
    res.send(result.rows)
  }).catch((error)=>{
    res.sendStatus(500)
  })
});

// add a new favorite 
router.post('/', (req, res) => {
   const {url} = req.body
  let queryText = `INSERT INTO "favorite" ("url") VALUES ($1);`
  pool.query(queryText, [url])
  .then((result)=>{
    res.sendStatus(200)
  }).catch((error)=>{
    res.sendStatus(500)
  })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  let tagFavorite = req.body.id
  console.log(tagFavorite);
  let queryText = `UPDATE "favorite" SET "category_id" = $1 WHERE "id" = $2`
  pool.query(queryText, [tagFavorite, req.params.favId])
  .then((result)=>{
    res.sendStatus(200);
  }).catch((error)=>{
    res.sendStatus(500)
  })
});

// delete a favorite
router.delete('/', (req, res) => {
  let deleteFavorite = req.body
  let queryText = `DELETE FROM "favorite" WHERE "id" = $1;`
  pool.query(queryText, [deleteFavorite])
  .then((result)=>{
    res.sendStatus(200);
  }).catch((error)=>{
    res.sendStatus(500)
  })
});

module.exports = router;
