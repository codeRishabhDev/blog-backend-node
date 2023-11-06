const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false}
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {expiresIn: "7d"});
    return token
}

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'), // Corrected 'lebel' to 'label'
        lastName: joi.string().required().label('Last Name'), // Corrected 'lebel' to 'label'
        email: joi.string().required().label('Email'), // Corrected 'lebel' to 'label'
        password: passwordComplexity().required().label('Password'), // Corrected 'lebel' to 'label'
    });
    return schema.validate(data);
}

module.exports = {User, validate};