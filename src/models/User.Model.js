const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "password should be greater than or equal 6 character!"],
        },
        image: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            default: "user"
        },

    },
    {
        timestamps: true
    }
)

UserSchema.pre("save", async function (next) {
    const user = this;
    console.log(user);
    const hashPassword = await bcrypt.hash(user.password, 10)
    this.password = hashPassword;
    next();
});

UserSchema.method.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare
}


const User = mongoose.model("users", UserSchema, "users");

module.exports = User;