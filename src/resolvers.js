const Article = require("./model/articleModel");
const User = require("./model/UserModel");
const generateToken = require("./utils/generateToken");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");
const setTokens = require("./utils/jwt");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    articles: async () => await Article.find({}),
  },

  Mutation: {
    /**
     * Register a new user
     * @route POST /api/auth/register
     * @access Public
     */
    registerUser: async (_, { newUser }) => {
      const userExists = await User.findOne({ email: newUser.email });
      if (userExists) {
        throw new Error("user email already exists");
      }
      const saveUser = new User(newUser);
      const user = await saveUser.save();

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return setTokens({ user: payload });
    },

    /**
     * Authenticate user and get token
     * @route POST /api/auth/login
     * @access Public
     */

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) return null;

      const isValidPassword = await user.isValidPassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        throw new Error("Incorrect email or password!");
      }

      return setTokens(user);
    },
  },
};

module.exports = resolvers;
