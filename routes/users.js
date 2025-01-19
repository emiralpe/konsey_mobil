const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, validateRegister, validateLogin} = require('../models/user');
const auth = require('../middleware/auth');

//#region Get All Users
/**
 * @swagger
 * /api/users/get:
 *   get:
 *     summary: Tüm kullanıcıları döner
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Kullanıcıların listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get',  async (req, res) => {
    const users = await User.find().select('-__v -password').populate('interests', 'name');
    res.send(users);
});
// #endregion

//#region Get User By ID
/**
 * @swagger
 * /api/users/get/{id}:
 *   get:
 *     summary: Belirli bir kullanıcıyı döner
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.get('/get/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-__v -password').populate('interests', 'name -_id');

    if(!user){
        return res.status(404).send('Aradığınız kullanıcı bulunamadı.');
    }

    res.send(user);
});
//#endregion

//#region Post User Create
/**
 * @swagger
 * /api/users/post:
 *   post:
 *     summary: Yeni bir kullanıcı oluşturur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               studentNumber:
 *                 type: number
 *               phoneNumber:
 *                 type: number
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kullanıcı oluşturuldu
 *       400:
 *         description: Geçersiz giriş
 */
router.post('/post', async (req, res) => {
    const {error} = validateRegister(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(400).send('Bu e-posta adresi zaten kayıtlı.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user = new User({
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        studentNumber: req.body.studentNumber,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        interests: req.body.interests,
        password: hashedPassword
    });

    try {
        const result = await user.save();
        const token = user.generateToken();
        res.status(201).header("x-auth-token", token).send(result);
    }catch (error){
        console.log(error.message);
    }
});
//#endregion

//#region Post Auth User
/**
 * @swagger
 * /api/users/auth:
 *   post:
 *     summary: Kullanıcıyı kimlik doğrulama
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kimlik doğrulama başarılı
 *       400:
 *         description: Geçersiz giriş
 */
router.post('/auth', async (req, res) => {
    const {error} = validateLogin(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(400).send('E-posta adresi veya şifre hatalı.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword){
        return res.status(400).send('E-posta adresi veya şifre hatalı.');
    }

    const token = user.generateToken();

    res.send(token);
});
//#endregion

//#region Put User Update
/**
 * @swagger
 * /api/users/put/{id}:
 *   put:
 *     summary: Belirli bir kullanıcıyı günceller
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               studentNumber:
 *                 type: number
 *               phoneNumber:
 *                 type: number
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kullanıcı güncellendi
 *       400:
 *         description: Geçersiz giriş
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.put('/put/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).send('Aradığınız kullanıcı bulunamadı.');
    }

    const {error} = validateRegister(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.name = req.body.name;
    user.surname = req.body.surname;
    user.birthday = req.body.birthday;
    user.studentNumber = req.body.studentNumber;
    user.phoneNumber = req.body.phoneNumber;
    user.email = req.body.email;
    user.address = req.body.address;
    user.interests = req.body.interests;
    user.password = hashedPassword;

    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
});
//#endregion

//#region Delete User
/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Belirli bir kullanıcıyı siler
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Kullanıcı silindi
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.delete('/delete/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return res.status(404).send('Aradığınız kullanıcı bulunamadı.');
    }

    res.send(user);
});
//#endregion

module.exports = router;