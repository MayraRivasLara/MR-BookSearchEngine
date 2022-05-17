const { User, Book }  = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in...");
      }

      const user = context.user;

      const foundUser = await User.findOne({
        _id: user._id,
      });

      if (!foundUser) {
        throw new Error("Cannot find this user!");
      }

      return foundUser;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {

      const user = await User.findOne({
        email: email,

      });

      if (!user) {
        throw new Error("Cannot find this user!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Password is incorrect!");
      }

      const token = signToken(user);
      return { token, user }
    },

    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({
            username, email, password
        });

        if (!user) {
            throw new Error("Something went wrong, please try again!");
        }

            const token = signToken(user);
            return { token, user }
    },
    
    saveBook: async (parent, { bookId, authors, description, title, image, link }) => {
        // const savedBook = await Book.create({
        //     bookId, authors, description, title, image, link
        // });

        // if (!savedBook) {
        //     throw new Error('Book no saved, please try again!');
        // }


        // console.log(User);
        // try {
        //   const updatedUser = await User.findOneAndUpdate(
        //     { _id: user._id },
        //     { $addToSet: { savedBooks: body } },
        //     { new: true, runValidators: true }
        //   );
        //   return res.json(updatedUser);
        // } catch (err) {
        //   console.log(err);
        //   return res.status(400).json(err);
        // }
    },

    removeBook: async (parent, { bookId }, context) => {
//         if (context.user) {
//             return Book.findOneAndDelete({
//                 _id: context.user._id});
//         }
//         throw new AuthenticationError('You need to be logged in to complete this action');
//     },
            
//   },
};

module.exports = resolvers;
