const User = require('../Models/user');


const user = require('../Models/user');


exports.create = async (req, res) => {
    const { Name, Email, Password, Username} = req.body;
  const newUser = new User({
    Username,
    Name,
    Email,
    Password,

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

// get the all the users
exports.viewUsers = async (req,res) =>{
    User.find().then((Users)=>{
     res.json(Users)
    }).catch((err)=>{
     console.log(err);
    })
 
 };




    
//user signin
exports.signIn = async (req, res) => {
    const { Email, Password } = req.body;
  
    try {
      console.log('Incoming data:', req.body); // Log incoming data
  
      // Find the user by email
      const user = await User.findOne({ Email });
      console.log('User found:', user); // Log the user found
  
      if (!user) {
        console.log('User not found with the provided email');
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Verify the password
      const isPasswordMatch = user.comparePassword(Password);
      console.log('Password match:', isPasswordMatch); // Log password match result
  
      if (!isPasswordMatch) {
        console.log('Password does not match');
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
     
  
      // If email, password are correct, return user data
      const { _id, Name,  } = user;
      res.json({ success: true, user: { id: _id, Name, } });
    } catch (error) {
      console.error('Error in signIn:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  