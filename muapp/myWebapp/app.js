var createError = require('http-errors');
var express = require('express');
var session = require('express-session'); // for session
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


 // ----------------------------- Let's creaate a store for users ------------------------------------

 // TODO: DB (Mongo or Postgres)
 const users = [
  { id: 1, name: 'admina', password: 'admina'},
  { id: 2, name: 'normalo', password: 'normalo'}
 ]
 // ________________________________________________________________________________________________________


var app = express();
// create application/json parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




 // out commented this ________________________________________________________________________________

// app.use('/', indexRouter);
// app.get('/', function (req, res) {
  // res.render('index', { title: 'AddressViz', message: 'Hello there!' })
// })

// ________________________________________________________________________________________________________



app.use('/users', usersRouter);
// app.get('/contacts', function
// (req,res) {
// res.send("List of contacts");
// });

// -------------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));

app.get('/adviz', function (req, res) {
  res.sendFile(__dirname + '/public/login-page.html');
})


// -------------------------------------------------------------------------------

// --------------------------- Session -----------------------------------------
const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 3000,
  NODE_ENV = 'development',

  SESS_NAME = 'sid',
  SESSION_SECRET = 'ssh!quiet,itasecret',
  SESS_LIFETIME = TWO_HOURS

} = process.env

// NODE_ENV = 'development';

const IN_PROD = NODE_ENV === 'production'


app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}))

// Authentification

const redirectLogin = (req,res, next) => {
  if (!req.session.userId){
    res.redirect('/login')
  } else{
    next()
  }
}

const redirectHome = (req,res, next) => {
  if (req.session.userId){
    res.redirect('/home')
  } else{
    next()
  }
}

app.use((req,res,next) => {
  const { userId} = req.session
  if (userId) {
    res.locals.user = users.find(
      user => user.id ===user.id
      )
  }
  next()
})

app.get('/', (req, res) => {
  // const userID  = 1
  // console.log(userID)
  const { userId } = req.session

  res.send(`
    <h1> Welcome to the Adviz, the web-app made by Dhimal Sameer & Shliamin Efim. </h1>
    ${userId ? `
      <a href='/home'>Home </a>
    <form method = 'post' action = '/logout'>
      <button>Logout</button>
    </form>
    `: `
      <a href='/login'>Login </a>
    `}
  `)

})

app.get('/home', redirectLogin, (req, res) => {
  // const { user } = res.locals

  const user = users.find( user => user.id === req.session.userId)

  res.send(`
    <h1> Home </h1>
    <form method = 'post' action = '/logout'>
      <button>Logout</button>
    </form>
    <ul>
      <li>Name: ${user.name}</li>
    </ul>
    `)

})

// app.get('/profile', redirectLogin, (req,res) => {
//   const { user } = res.locals
// })

app.get('/login', redirectHome, (req, res) => {

  res.send(`
    <h1> Login </h1>
    <form method = 'post' action = '/login'>
      <input type='name' placeholder= 'Name' name='name' required />
      <input type='password' placeholder= 'Password' name='password'  required />
      <input type = 'submit' />
    </form>
    `)
})

// app.get('/register', redirectHome, (req, res) => {

//     res.send(`
//     <h1> Register </h1>
//     <form method = 'post' action = '/register'>
//       <input type='name' placeholder= 'Name' name='name' required />
//       <input type='password' placeholder= 'Password' name = 'password' required />
//       <input type = 'submit' />
//     </form>
//     <a href='/login'>Login</a>
//     `)

// })

app.post('/login', redirectHome, (req, res) => {
  const { name, password} = req.body;
  console.log(name);
  console.log(req.body);
  // console.log(req);

  if (name && password ) { //TODO: validation
    const user = users.find( user => user.name === name && user.password === password ) // TODO: hash
    console.log(user);

    if (user) {
      req.session.userId = user.id;
      return res.redirect('/home');
    }
  }

  console.log('not found');
  res.redirect('/login');
})

// app.post('/register', redirectHome, (req, res) => {
//   const { name, password} = req.body

//   if (name && password ) { //TODO: validation
//     const exists = users.some( user => user.name === name)


//     if (!exist){
//       const user = {
//         id: users.length + 1,
//         name,
//         password // TODO: hash
//       }

//       users.push(user)

//       req.sessionuserId = user.Id

//       return res.redirect('/home')
//     }
//   }

//   res.redirect('/register') //TODO: qs errors  /register?error=error.auth.userExists (eg.)
// })

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/')
    }

    res.clearCookie(SESS_NAME)
    res.redirect('/login')
  })
})

// -------------------------------------------------------------------------------


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
