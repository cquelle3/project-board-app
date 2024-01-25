const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./models');

//register an account
router.post('/register', async function(req, res) {
    //check if username exists
    var usernameCheck = await User.find({username: req.body.username});
    if(usernameCheck.length > 0){
        return res.status(401).json({ message: 'Username already exists.' });
    }

    //create a new user
    var newUser = new User(req.body);
    //hash the password
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    //save the new user
    const savedUser = await newUser.save();
    //create user data for new user
    //var newUserData = new UserData({userId: savedUser._id, servers: [], invites: {}});
    //save the new users data
    //const savedUserData = await newUserData.save();
    //return saved user
    return res.status(200).json({ saved: savedUser });
});

//login to an account
router.post('/login', async function(req, res) {
    //find an existing user via username
     const user = await User.findOne({
        username: req.body.username
    });

    //if a user with the given username does not exist, or the password is incorrect, throw an invalid error
    if(!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const signObj = {
        userId: user.id,
        username: user.username,
        password: user.password
    };

    //get user id
    const userId = user.id;
    //get username
    const username = user.username;
    //sign a json token and send it back to the frontend
    const accessToken = jwt.sign(signObj, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ accessToken: accessToken, userId: userId, username: username });
});

//verify jwt tokens
router.post('/verify', function(req, res) {
    //get token from request
    const accessToken = req.body.accessToken;

    //if no token is given, return error
    if(!accessToken){
        return res.status(401).send("Authorization failed. No token was given.");
    }
    else{
        try{
            //verify token and send back the result
            tokenVerify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return res.json({verified: tokenVerify});
        }
        catch(error){ 
            //if the token is invalid, send an error
            return res.status(401).send("Authorization failed. Invalid token.");
        }
    }
});

module.exports = router;