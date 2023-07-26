const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required!"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Invalid Email"
        }
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    }

},{timestamps: true});

UserSchema.virtual("confirmPass")
    .get( () => this._confirmPass)
    .set( value => this._confirmPass = value);

UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPass){
        this.invalidate("confirmPass", "Passwords must match!");
    }
    next();
});

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema);