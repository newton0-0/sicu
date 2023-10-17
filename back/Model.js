const mongoose = require('mongoose')

const Reg = new mongoose.Schema({
    hospitalName: {
        type: String
    },
    emailID: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    city: {
        type: String
    },
    hospitalRegNumber: {
        type: String
    },
    state: {
        type: String
    },
    emergencyWardNumber: {
        type: String
    },
    pincode: {
        type: String
    },
    registrationCertificate: {
        type: String
    },
    hospitalRegDate: {
        type: Date
    },
    ambulanceAvailable: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    code: {
        type: String
    }
})

const RegSchema = mongoose.model('regSchema', Reg)
module.exports = RegSchema