const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then( user => res.json(user))
            .catch( err => res.status(400).json(err));
    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then(
                user => {
                    if(user === null){
                        res.status(400).json({message:"Invalid Credentials"})
                    }

                    if(!bcrypt.compare(req.body.password, user.password)){
                        res.status(400).json({message:"Invalid Credentials"})
                    }

                    const userToken = jwt.sign({
                        id: user._id
                    }, process.env.SECRET_KEY)
                    res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "Logged in!"});
                }
            )
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

}