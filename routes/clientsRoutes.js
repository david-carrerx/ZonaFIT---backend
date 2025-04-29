const express = require('express');
const Client = require('../models/Client');

const router = express.Router();

router.post('/add-client', async (req, res) => {
    try {
        const { name, start_date, end_date, package } = req.body;

        if(!name || !start_date || !end_date || !package){
            return res.status(400).json(({ msg: "All the fields are required"}));
        }

        const client = new Client({
            name,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            package
        });

        await client.save();
        res.status(201).json({ msg: "Client added succesfully", client});
    } catch(e){
        console.log(e);
        res.status(500).json({ msg: "Server error"});
    }
});

module.exports = router;