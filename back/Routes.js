require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const RegSchema = require('./Model')
const jwt = require('jsonwebtoken')

const route = express.Router()

route.post('/signup', async (req, res) => {
    const {hospitalName, emailID, address, phoneNumber, city, hospitalRegNumber, state, emergencyWardNumber, pincode, registrationCertificate, hospitalRegDate, ambulanceAvailable, password} = req.body
    const newPassword = await bcrypt.hash( password, 10 )
    const randomNumber = Math.floor(Math.random() * (9999 - 999 + 1)) + 999;
    console.log({hospitalName, emailID, address, phoneNumber, city, hospitalRegNumber, state, emergencyWardNumber, pincode, registrationCertificate, hospitalRegDate, ambulanceAvailable, password});
    try {
        const user = {hospitalName, emailID, address, phoneNumber, city, hospitalRegNumber, state, emergencyWardNumber, pincode, registrationCertificate, hospitalRegDate, ambulanceAvailable, password : newPassword, status : true, randomNumber};
        const newUser = await RegSchema.create(user);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
    }
})

route.post('/login', async (req, res) => {
    const {loginHospitalName, loginEmailID, loginPassword, loginCode} = req.body
    try {
        const user = {loginHospitalName, loginEmailID, loginPassword, loginCode}
        const exists = await RegSchema.findOne({emailID : loginEmailID})
        if(!exists) {
            console.log('not exists');
            return res.status(404).json({msg : 'user does not exists'})  
        }
        if(exists.emailID !== user.loginEmailID ) {
            console.log('mail password');
            return res.status(404).json({msg : 'invalid credentials'}) 
        }
        if(user.loginCode !== exists.hospitalRegNumber) {
            return res.status(400).json({msg : 'wrong access code'})
        }
        bcrypt.compare(user.loginPassword, exists.password)
            .then(() => {
                jwt.sign({user}, process.env.code, {expiresIn : "2h"}, (err,token) => {
                    if(err) {
                        return res.status(400).json({ result : "something not right" })
                    }
                    return res.status(200).json({username : exists.emailID, auth : token})
                })
            })
            .catch((err) => {
                res.status(400).json({msg : 'invalid password'})
            })
    } catch (error) {
        console.log(error);
    }
})

route.get('/dashboard', async (req, res) => {
    const data = await RegSchema.find();
    res.status(200).json(data);
})

route.patch('/dashboard/:id', async (req, res) => {
    const chng = req.body;
    const newStatus = await RegSchema.findByIdAndUpdate(req.params.id, chng);
    res.status(201).json(newStatus);
    console.log(newStatus);
})

module.exports = route;