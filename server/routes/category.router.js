const express = require('express');
const pool = require('../modules/pool');
const router = require('express').Router();

router.get('/', (req, res) => {
    // return all categories
    const queryText = `SELECT * FROM "category" ORDER BY "name" ASC`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    const queryText = `UPDATE "category" SET "name" = $2 WHERE "id"=$1;`;
    let idToUpdate = req.params.id
    console.log(idToUpdate);
    console.log(req.body);
    pool.query(queryText, [idToUpdate, req.body.name])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in server side PUT', error);
        res.sendStatus(500);       
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    let categoryToAdd = req.body.name;
    const queryText = `INSERT INTO "category" ("name") VALUES ($1);`;
    
    pool.query(queryText, [categoryToAdd])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in server side POST', error);
        res.sendStatus(500);        
    })
});

router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM "category" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then((result)=> {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in server side DELETE', error);
        res.sendStatus(500);        
    })
});

module.exports = router;
