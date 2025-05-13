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

router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (e) {
        res.status(500).json({msg: "Server error"});
    }
});

router.put('/update-client/:id', async (req, res) => {
    try {
        const { start_date, end_date, package } = req.body;

        if(!start_date || !end_date || !package){
            return res.status(400).json({ msg: "All fields are required"});
        }

        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,{
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                package
            },
            { new: true }
        );

        if(!updatedClient){
            return res(404).json({ msg: "Client not found"});
        }

        res.status(200).json({ msg: "Client updated successfully"});
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Server error"});
    }
});

module.exports = router;