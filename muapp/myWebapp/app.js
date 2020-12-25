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
    { id: 1, name: 'admina', password: 'admina' },
    { id: 2, name: 'normalo', password: 'normalo' }
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

app.get('/test', function(req, res) {
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

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/adviz')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home')
    } else {
        next()
    }
}

app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals.user = users.find(
            user => user.id === user.id
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
      <a href='/adviz'>Login to the Adviz </a>
    `}
  `)

})

app.get('/home', redirectLogin, (req, res) => {
    // const { user } = res.locals

    const user = users.find(user => user.id === req.session.userId)

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

app.get('/adviz', redirectHome, (req, res) => {

    res.send(`
    <!DOCTYPE html>
    <html>

    <head>
    <title>
        AdViz
    </title>
    <link href="#" rel="shortcut icon">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <link crossorigin="anonymous" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" rel="stylesheet" />
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="/stylesheets/styles.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/css/bootstrap-switch-button.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/dist/bootstrap-switch-button.min.js">
    </script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js">
    </script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
    <link href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" rel="stylesheet">
    <link href="https://fonts.gstatic.com" rel="preconnect">
    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
    <meta charset="utf-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    </meta>
    </meta>
    </meta>
    </link>
    </link>
    </link>
    </link>
    </meta>
    </link>
    </head>
    <body>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xs-12 col-md-10 col-lg-6">
          <div class="input_form">
            <form method = 'post' action = '/adviz'>
            <h1> Login </h1>
            <hr>
              <label class="control-label">
                                <label for="Username">
                                    <b>
                                        Username:
                                    </b>
                                </label>
                            </label>
                            <input id="username" name="name" placeholder="Name" required type="text1">
                            <label class="control-label">
                                <label for="psw">
                                    <b>
                                        Password:
                                    </b>
                                </label>
                            </label>
                            <input id="psw" name="password" placeholder="Password" required type="password1">
                            <button class="loginbtn" type="submit">
                                Login
                            </button>
                            </input>
                            </input>
            </hr>
            </form>
          </div>
        </div>
      </div>
    </div>
    </body>
    </html>
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

app.post('/adviz', redirectHome, (req, res) => {
    const { name, password } = req.body;


    if (name && password) { //TODO: validation
        const user = users.find(user => user.name === name && user.password === password) // TODO: hash

        if (user) {
            req.session.userId = user.id;
            return res.redirect('/home');
        }
    }

    res.redirect('/adviz');
})

app.get('/adviz/login', redirectHome, (req, res) => {

    res.send(`
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xs-12 col-md-10 col-lg-6">
          <div class="input_form">
            <form method = 'post' action = '/adviz/login'>
            <h1> Login </h1>
            <hr>


              <label class="control-label">
                                <label for="Username">
                                    <b>
                                        Username:
                                    </b>
                                </label>
                            </label>
                            <input id="username" name="name" placeholder="Name" required type="text1">
                            <label class="control-label">
                                <label for="psw">
                                    <b>
                                        Password:
                                    </b>
                                </label>
                            </label>
                            <input id="psw" name="password" placeholder="Password" required type="password1">
                            <button class="loginbtn" type="submit">
                                Login
                            </button>
                            </input>
                            </input>
            </hr>
            </form>
          </div>
        </div>
      </div>
    </div>
    `)
})

app.post('/adviz/login', redirectHome, (req, res) => {
    const { name, password } = req.body;
    if (name && password) { //TODO: validation
        const user = users.find(user => user.name === name && user.password === password) // TODO: hash

        if (user) {
          let bool = false;
          if (user.name == 'admina') {
            bool = true;
          }else{
            bool = false;
          }


            req.session.userId = user.id;
            res.status(200).json({
                name: user.name,
                password: user.password,
                isAdminFlag: bool,
              })


            // res.end(JSON.stringify({ name: user.name, password: user.password, isAdminFlag: bool }, null, 3));
        }
    if (!user)  {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthorized',
      });
    }
    }
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
        res.redirect('/adviz')
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
