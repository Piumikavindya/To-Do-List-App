const User = require('../Models/user');

exports.create = async (req, res) => {
  const { name, email, password, username } = req.body;
  const newUser = new User({
    username,
    name,
    email,
    password,
  });

  try {
    console.log('New User:', newUser);

    // Save the new user to the database
    await newUser.save();

    res.json({ user: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.viewUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Incoming data:', req.body);

    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found with the provided email');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordMatch = user.comparePassword(password);
    console.log('Password match:', isPasswordMatch);

    if (!isPasswordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const { _id, name } = user;
    res.json({ success: true, user: { id: _id, name } });
  } catch (error) {
    console.error('Error in signIn:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
