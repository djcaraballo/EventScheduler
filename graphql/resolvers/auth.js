const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../../models/user');

const createToken = async (user) => {
  const token = await jwt.sign({userId: user.id, email: user.email}, 'thesupersecretsecuritykey', {
    expiresIn: '1h'
  });
  return token;
};

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({email: args.userInput.email})

      if (existingUser) {
        throw new Error('User already exists. Please try again.')
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const result = await user.save();

      const token = createToken(user)
      return { ...result._doc, password: null, _id: result.id, token: token, tokenExpiration: 1};
    } catch (err) {
      throw err;
    }
  },
  login: async ({email, password}) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const passwordIsEqual = await bcrypt.compare(password, user.password);
    if (!passwordIsEqual) {
      throw new Error('Password is incorrect');
    }
    const token = createToken(user);
    return {userId: user.id, token: token, tokenExpiration: 1};
  }
};
