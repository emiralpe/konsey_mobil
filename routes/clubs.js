const express = require('express');
const router = express.Router();
const {Club, validateClub} = require('../models/club');
const auth = require('../middleware/auth');

router.get('/get',  async (req, res) => {
    const clubs = await Club.find().select('-__v');
    res.send(clubs);
});

router.get('/get/:id', async (req, res) => {
    const club = await Club.findById(req.params.id).select('-__v');

    if(!club){
        return res.status(404).send('Aradığınız kulüp bulunamadı.');
    }

    res.send(club);
});

router.post('/add', auth, async (req, res) => {
    const {error} = validateClub(req.body);

    if(error){
        return res
            .status(400)
            .send(error.details[0].message);
    }

    const club = new Club({
        name: req.body.name,
        description: req.body.description
    });

    await club.save();
    res.send(club);
});

router.put('/update/:id', auth, async (req, res) => {
    const {error} = validateClub(req.body);

    if(error){
        return res
            .status(400)
            .send(error.details[0].message);
    }

    const club = await Club.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, {new: true});

    if(!club){
        return res.status(404).send('Aradığınız kulüp bulunamadı.');
    }

    res.send(club);
});

router.delete('/delete/:id', auth, async (req, res) => {
    const club = await Club.findByIdAndDelete(req.params.id);

    if(!club){
        return res.status(404).send('Aradığınız kulüp bulunamadı.');
    }

    res.send(club);
});

module.exports = router;