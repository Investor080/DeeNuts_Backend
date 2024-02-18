require('dotenv').config();
const User = require('../model/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

},
    async (req, email, password, done) => {
        try {
             //check if user with the same email exist
             const user = await User.findOne({email});
             if(user) {
                 return done (null, false, { message : 'User already exist '})
             }

             // Hash the password
             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(password, salt);
             
             // create new User
             const newUser = new User({
                username: req.body.username,
                email: email,
                password: hashedPassword,
                isAdmin: false
             });

             await newUser.save();

             // create a token
             const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

             return done(null, { newUser, token });
        } catch (error) {
            return done(error);
            
        }
    })
);

const signup = async (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        if (err) {
            return next (err)
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        res.json({ message: 'You have successfully signed Up' })
    })(req, res, next);
};

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const exisitingUser = await User.findOne({ email })
        if(!exisitingUser) {
            return done (null, false, { message: 'User not found' })
        }
        const passwordMatch = await bcrypt.compare(password, exisitingUser.password)
        if(!passwordMatch) {
            return done (null, false, { message: 'Invalid credentials' })
        }
        return done (null, exisitingUser);
    } catch (error) {
        return done (error)
    }
})
)
const login = async (req, res) => {

    try {

       passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ message: info.message || 'Login failed' });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({user: { email: user.email }, token});
        });
       })(req, res);
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    signup,
    login
}