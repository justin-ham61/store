
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express();
app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] !== 'https' || !req.headers.host.startsWith('www.')){
    return res.redirect(301, `https://www.${req.headers.host}${req.url}`)
  }
  next();
})
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('./utils/AuthFunc');
const {sessionOptions} = require('./utils/const/key')

// Session and Auth Management Middleware -------------------------------------------

app.use(session({
  secret: sessionOptions.secret, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  User.findOne(email, (err, user) => {
    if (err) {
        console.log('err')
        return done(err);
    }
    if (!user) {
        console.log('no user')
        return done(null, false, {message: 'That email is not registered'});
    }
    if (user.verification === 0){
      console.log('needs verification')
      return done(null, false, {message: 'Please verify email'});
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Password incorrect'});
        }
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.customer_id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(passport.initialize());
app.use(passport.session());



// Routes ------------------------------------------------------------------

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build'));
    app.use(function(req, res) {
      res.status(404).redirect('/');
    });
  });

app.get('/Auth/VerifyEmail/:crypt', async (req, res) => {
    const crypt = req.params.crypt
    console.log(crypt)
    const customer = await User.getIdByCrypt(crypt);
    console.log(customer)
    if(customer){
      User.updateCustomerVerification(customer.customer_id)
      User.deleteVerificationCrypt(customer.customer_id)
      res.redirect(302, 'https://www.casadecleaners.com?state=verified')
    } else {
      res.redirect(302, 'https://www.casadecleaners.com?state=notverified')
    }
})

app.get('/test', (req,res) => {
  console.log("hello World")
})


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const userRouter = require('./routes/Auth.js');
const adminRouter = require('./routes/Admin.js');
const orderRouter = require('./routes/Order.js');
const { options } = require('./routes/Auth.js');
app.use('/Auth', userRouter);
app.use('/Admin', adminRouter);
app.use('/Order', orderRouter);

