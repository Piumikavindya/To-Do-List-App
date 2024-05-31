const router = require('express').Router();
const passport = require('passport');
const User = require('../Models/user');
const { create, signIn, viewUsers,} = require('../Controllers/user');



router.post("/create",create, (req, res) => {
  console.log("Received a request to create a user:", req.body);
  create(req, res);
});
router.get('/view-users', viewUsers);

router.post('/signIn', signInValidator, validate, signIn);

module.exports = router;
