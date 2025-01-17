const express = require('express');
const router = express.Router();
const { Interest, validateInterest } = require('../models/interest');

/**
 * @swagger
 * /api/interests/get:
 *   get:
 *     summary: Tüm ilgi alanlarını döner
 *     tags: [Interests]
 *     responses:
 *       200:
 *         description: İlgi alanlarının listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get', async (req, res) => {
    const interests = await Interest.find();
    res.send(interests);
});

/**
 * @swagger
 * /api/interests/post:
 *   post:
 *     summary: Yeni bir ilgi alanı oluşturur
 *     tags: [Interests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: İlgi alanı oluşturuldu
 *       400:
 *         description: Geçersiz giriş
 */
router.post('/post', async (req, res) => {
    const { error } = validateInterest(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let interest = new Interest({
        name: req.body.name
    });

    try {
        const result = await interest.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error.message);
    }
});

/**
 * @swagger
 * /api/interests/put/{id}:
 *   put:
 *     summary: Belirli bir ilgi alanını günceller
 *     tags: [Interests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: İlgi alanı ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: İlgi alanı güncellendi
 *       400:
 *         description: Geçersiz giriş
 *       404:
 *         description: İlgi alanı bulunamadı
 */
router.put('/put/:id', async (req, res) => {
    const { error } = validateInterest(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const interest = await Interest.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });

    if (!interest) {
        return res.status(404).send('Aradığınız ilgi alanı bulunamadı.');
    }

    res.send(interest);
});

/**
 * @swagger
 * /api/interests/delete/{id}:
 *   delete:
 *     summary: Belirli bir ilgi alanını siler
 *     tags: [Interests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: İlgi alanı ID'si
 *     responses:
 *       200:
 *         description: İlgi alanı silindi
 *       404:
 *         description: İlgi alanı bulunamadı
 */
router.delete('/delete/:id', async (req, res) => {
    const interest = await Interest.findByIdAndDelete(req.params.id);

    if (!interest) {
        return res.status(404).send('Aradığınız ilgi alanı bulunamadı.');
    }

    res.send(interest);
});

module.exports = router;

