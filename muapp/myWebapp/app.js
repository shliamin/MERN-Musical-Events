


var createError = require('http-errors');
const Joi = require('joi');
var express = require('express');
var session = require('express-session'); // for session
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const Contact = require('./models/contact');


// ----------------------------- Let's creaate a store for users ------------------------------------

// TODO: DB (Mongo or Postgres)
const users = [
    { id: 1, name: 'admina', password: 'admina' },
    { id: 2, name: 'normalo', password: 'normalo' }
]

let contacts = [
    { id: 1, name: 'Angela', surname: 'Merkel', street: 'Am Kupfergraben 6', plz: '10117', city: 'Berlin', country: 'Germany', privacy: true, creator: 'admina' },
    { id: 2, name: 'Bundeskanzlerin', surname: 'der Bundesrepublik Deutschland', street: 'Willy-Brandt-Strasse 1', plz: '10557', city: 'Berlin', country: 'Germany', privacy: false, creator: 'admina' },
    { id: 3, name: 'Erich', surname: 'Fromm', street: 'Stralsunder Strasse 14', plz: '13355', city: 'Berlin', country: 'Germany', privacy: true, creator: 'normalo' },
    { id: 4, name: 'Western', surname: 'Philosopher', street: 'Potsdamer Platz 1', plz: '10785', city: 'Berlin', country: 'Germany', privacy: false, creator: 'normalo'}
]
// ________________________________________________________________________________________________________


var app = express();
// create application/json parser
// parse application/x-www-form-urlencoded
mongoose.connect("mongodb+srv://Efim:m8ZFB7qi2eif3mk@cluster0.of3bb.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() =>{
    console.log('Connection failed!');
  });


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


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
    <body style ='background: #1B2428;'>
    <h1 style = "color: #ffffff; text-align: center, font-family: 'Lato', sans-serif; font-size: 54px; font-weight: 300; line-height: 58px; margin: 0 0 58px;"> Welcome to the Adviz, <br/>
    the web-app made by <br/>
    Dhimal Sameer & Shliamin Efim </h1>
    ${userId ? `
      <a href='/home' style = "color: #adb7bd; font-family: 'Lucida Sans', Arial, sans-serif; font-size: 16px; line-height: 26px; text-indent: 30px; margin: 0;">Home </a>
    <form method = 'post' action = '/logout'>
      <button>Logout</button>
    </form>
    `: `
      <a href='/adviz' style ="color: #adb7bd; font-family: 'Lucida Sans', Arial, sans-serif; font-size: 16px; line-height: 26px; text-indent: 30px; margin: 0;">Login to the Adviz </a>
      </body>
    `}
  `)

})

app.get('/home', redirectLogin, (req, res) => {
    // const { user } = res.locals

    const user = users.find(user => user.id === req.session.userId)

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
            <ul class="nav justify-content-end">
                <li>
                    <h2 class="greetings">
                        Hello, ${user.name}!
                    </h2>
                </li>
                <li>
                    <button class="btn btn-warning" onclick="getMap(arrayOFHashesAll); showAllCardsFor('admina')" type="button">
                        Show all contacts
                    </button>
                </li>
                <li>
                    <form method = 'post' action = '/adviz/contacts'>
                      <input type="submit" name="upvote" value="Show my contacts"  class="btn btn-warning"/>
                    </form>
                </li>
                <li>
                    <button class="btn btn-success" data-target="#Modal1" data-toggle="modal" data-whatever="@mdo" type="button">
                        Add new contact
                    </button>
                </li>
                <li class="nav-item">
                <form method = 'post' action = '/logout'>
                  <input type="submit" name="upvote" value="Log out"  class="btn btn-danger"/>
                </form>
                </li>
            </ul>
            <div aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" id="Modal1" role="dialog" tabindex="-1">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Add new address
                            </h5>
                            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                        </div>
                        <div class="modal-body" id="modal-body-admina">
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-dismiss="modal" type="button">
                                Close
                            </button>
                            <button class="btn btn-primary" type="button" onclick="javascript:addNewCard()">
                                Add new address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="cards_main_page" id="all_cards">
                    <!-- All cards are here -->
                </div>
                <div id="map">
                </div>
            </div>
            </body>
    </html>
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
   <!DOCTYPE html>
    <html>

    <head>
    <title>
        AdViz API
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
            <form method = 'post' action = '/adviz/login'>
            <h1> Login <span style="color:red;">(API)</span> </h1>
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

app.get('/adviz/contacts', (req, res) => {
  res.send(contacts);
});

// app.get('/adviz/contacts/:creator', (req, res) => {
//   var contactsOfUser = contacts.filter(contact => contact.creator === req.params.creator);
//   if(!contactsOfUser) res.status(404).send('There are no contacts for this user');
//   res.send(contactsOfUser);
// });

app.get('/adviz/contacts/:param', (req, res) => {
  if (req.params.param == 'admina' || req.params.param == 'normalo' ){
    var contactsOfUser = contacts.filter(contact => contact.creator === req.params.param);
    if(!contactsOfUser) return res.status(404).send('There are no contacts for this user');
    res.send(contactsOfUser);
  } else{
      let contact = contacts.find(contact => contact.id === parseInt(req.params.param));
      if(!contact) return res.status(404).send('There are no contacts with a given id');
      res.send(contact);
  }
});

app.post('/adviz/contacts', (req,res) => {

  const { error } = validateContact(req.body); //result.error

  if (error) return res.status(400).send(error.details[0].message);


  // DB______________________________________-
  // let contact = new Contact({
  //   name: req.body.name,
  //   surname: req.body.surname,
  //   street: req.body.street,
  //   plz: req.body.plz,
  //   city: req.body.city,
  //   country: req.body.country,
  //   privacy: req.body.privacy,
  //   creator: req.body.creator
  // });

  let contact = {
    id: contacts.length + 1,
    name: req.body.name,
    surname: req.body.surname,
    street: req.body.street,
    plz: req.body.plz,
    city: req.body.city,
    country: req.body.country,
    privacy: req.body.privacy,
    creator: req.body.creator
  }
  contact.save();
  contacts.push(contact);
  res.status(201);
  res.send(contact);
});

app.put('/adviz/contacts/:id', (req,res) => {
  let contact = contacts.find(contact => contact.id === parseInt(req.params.id));
  if(!contact) return res.status(404).send('The contact with the given ID is not found.');

  const { error } = validateContact(req.body); //result.error

  if (error) return res.status(400).send(error.details[0].message);

  contact.name = req.body.name;
  contact.surname = req.body.surname;
  contact.street = req.body.street;
  contact.plz = req.body.plz;
  contact.city = req.body.city;
  contact.country = req.body.country;

  res.send(contact);
});

app.delete('/adviz/contacts/:id', (req,res) => {
  let contact = contacts.find(contact => contact.id === parseInt(req.params.id));
  if(!contact) return res.status(404).send('The contact with the given ID is not found.');

  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);

  res.send(contact);
});

function validateContact(contact) {
  const schema = {
    name: Joi.string().required(),
    surname: Joi.string().required(),
    street: Joi.string().required(),
    plz: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    privacy: Joi.boolean().required(),
    creator: Joi.string().required()
  };
  return Joi.validate(contact, schema);
}

let cardsCounter = 0;
    // A function to create a card with a contact inside, and a random background picture of a city + the edit/delete-section
    function getCard(wheretoplace, vorname, nachname, strasse, plz, stadt, land, privateOrPublic, type, num) {
        // Create card
        let divCard = document.createElement("div");
        // Add a class for css styles
        divCard.className = "card";
        // We need a uniq id for the card (with connection to the contact)
        divCard.id = `card_${type}_${privateOrPublic}_${num}`;
        // --------We want to have a background image for the card as a picture of a random city from unspalsh.com-------
        // a function to create a random number
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        // Create a random number between 0 and 14
        let randomNumber = getRandomInt(14);
        // Let's choose a random city name based on a number between 0 and 14
        let city;
        switch (randomNumber) {
            case 0:
                city = "moscow";
                break;
            case 1:
                city = "london";
                break;
            case 2:
                city = "rome";
                break;
            case 3:
                city = "paris";
                break;
            case 4:
                city = "helsinki";
                break;
            case 5:
                city = "warsaw";
                break;
            case 6:
                city = "barcelona";
                break;
            case 7:
                city = "tokyo";
                break;
            case 8:
                city = "venice";
                break;
            case 9:
                city = "stockholm";
                break;
            case 10:
                city = "chicago";
                break;
            case 11:
                city = "budapest";
                break;
            case 12:
                city = "lisbon";
                break;
            case 13:
                city = "madrid";
                break;
            case 14:
                city = "oslo";
                break;
            default:
                city = "berlin"
        }
        // Create a background picture with gradient for better readability of the text on it using a random city name (as city)
        divCard.style.backgroundImage = `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),url(https://source.unsplash.com/900x900/?${city})`;
        //-----------------------------------------------------------------------------------
        // Create contact for the card
        let divContact = document.createElement("div");
        // We need a uniq id for the contact (with connection to the card)
        divContact.id = `contact_${type}_${num}`;
        // The color could be orange for public and green for private
        let color;
        if (privateOrPublic == 'private') {
            color = 'green';
        } else {
            color = 'orange';
        }
        // Put in the info
        divContact.innerHTML = `<span class="yellow-black">Vorname:</span> <span id='vorname_${type}_${privateOrPublic}_${num}'>${vorname}</span><br /> <span class="yellow-black">Nachname:</span> <span id='nachname_${type}_${privateOrPublic}_${num}'>${nachname}</span><br /> <span class="yellow-black">Strasse:</span><span id='strasse_${type}_${privateOrPublic}_${num}'> ${strasse}</span><br /> <span class="yellow-black" >PLZ:</span> <span id='plz_${type}_${privateOrPublic}_${num}'>${plz}</span><br /> <span class="yellow-black" >Stadt:</span><span id='stadt_${type}_${privateOrPublic}_${num}'> ${stadt}</span><br /> <span class="yellow-black">Land:</span><span id='land_${type}_${privateOrPublic}_${num}'> ${land}</span><br /> <span class='${color}'><span id='private_or_public_${type}_${privateOrPublic}_${num}'>${privateOrPublic}</span></span>`;
        // Append contact to the card
        divCard.append(divContact);
        // ------------- Here we want to create an edit/delete section for the card-----------------------
        // Create the i section
        let i = document.createElement("i");
        i.className = "far fa-edit fa-2x";
        i.setAttribute("data-target", `#target_id_${type}_${num}`);
        i.setAttribute("data-toggle", "modal");
        i.setAttribute("data-whatever", "@mdo");
        i.setAttribute("id", "edit_icon");
        // Create the Label
        let divModalLabel = document.createElement("div");
        divModalLabel.setAttribute("aria-hidden", "true");
        divModalLabel.setAttribute("aria-labelledby", "exampleModalLabel");
        divModalLabel.setAttribute("class", "modal fade");
        divModalLabel.setAttribute("id", `target_id_${type}_${num}`);
        divModalLabel.setAttribute("role", "dialog");
        divModalLabel.setAttribute("tabindex", "-1");
        // Create the Dialog
        let divModalDialog = document.createElement("div");
        divModalDialog.setAttribute("class", "modal-dialog");
        divModalDialog.setAttribute("role", "document");
        // Create the Content
        let divModalContent = document.createElement("div");
        divModalContent.setAttribute("class", "modal-content");
        // Create the Header for the Content
        let divModalHeader = document.createElement("div");
        divModalHeader.setAttribute("class", "modal-header");
        let hDivModalHeader = document.createElement("h5");
        hDivModalHeader.setAttribute("class", "modal-title");
        hDivModalHeader.setAttribute("id", "exampleModalLabel");
        hDivModalHeader.innerHTML = "Edit Address";
        // Create close button
        let buttonDivModalHeader = document.createElement("button");
        buttonDivModalHeader.setAttribute("aria-label", "Close");
        buttonDivModalHeader.setAttribute("class", "close");
        buttonDivModalHeader.setAttribute("data-dismiss", "modal");
        buttonDivModalHeader.setAttribute("type", "button");
        let spanButtonDivModalHeader = document.createElement("span");
        spanButtonDivModalHeader.setAttribute("aria-hidden", "true");
        spanButtonDivModalHeader.innerHTML = "×";
        buttonDivModalHeader.append(spanButtonDivModalHeader);
        divModalHeader.append(hDivModalHeader);
        divModalHeader.append(buttonDivModalHeader);
        // Create the Body for the Content
        let divModalBody = document.createElement("div");
        divModalBody.setAttribute("class", "modal-body");
        divModalBody.setAttribute("id", `modal_body_${type}_${num}`);
        // -------- Here we want to insert different forms ---------------------
        let id_for_label_1 = `recipient-name-${type}-${num}`;
        let id_for_label_2 = `recipient-nachname-${type}-${num}`;
        let id_for_label_3 = `recipient-strasse-${type}-${num}`;
        let id_for_label_4 = `recipient-plz-${type}-${num}`;
        let id_for_label_5 = `recipient-stadt-${type}-${num}`;
        let id_for_label_6 = `recipient-land-${type}-${num}`;
        let text1 = "Vorname";
        let text2 = "Nachname";
        let text3 = "Strasse";
        let text4 = "PLZ";
        let text5 = "Stadt";
        let text6 = "Land";
        let id_for_input1 = `recipient-name-${type}-${num}`;
        let id_for_input2 = `recipient-nachname-${type}-${num}`;
        let id_for_input3 = `recipient-strasse-${type}-${num}`;
        let id_for_input4 = `recipient-plz-${type}-${num}`;
        let id_for_input5 = `recipient-stadt-${type}-${num}`;
        let id_for_input6 = `recipient-land-${type}-${num}`;
        let id_for_input_check = `check_private_${privateOrPublic}_${type}_num_${num}`;
        let id_for_input_check_as_normalo = `id_for_input_check_as_normalo_${type}_${num}`;
        // Create a form synamically
        let form = document.createElement("form");
        form.setAttribute("id", "input_form_contact");
        form.setAttribute("role", "form");
        // Create array
        let array = [1, 2, 3, 4, 5, 6];
        // Create 6 different divs
        function createDivs(value) {
            this["div" + value] = document.createElement("div");
            this["div" + value].classList.add("form-group");
        }
        array.forEach(createDivs);
        // Create 6 different labels
        function createLabels(value) {
            this["label" + value] = document.createElement("Label");
            this["label" + value].classList.add("col-form-label");
            this["label" + value].setAttribute("for", eval(`id_for_label_${value}`));
            this["label" + value].innerHTML = eval(`text${value}`);
        }
        array.forEach(createLabels);
        // Create 6 different inputs
        function createInputs(value) {
            this["input" + value] = document.createElement("input");
            this["input" + value].classList.add("form-control");
            this["input" + value].setAttribute("id", eval(`id_for_input${value}`));
            this["input" + value].setAttribute("required", "true");
            this["input" + value].setAttribute("type", "text2");
        }
        array.forEach(createInputs);
        // Appned all labels and inputs:
        function appendLabels(value) {
            eval(`div${value}`).append(eval(`label${value}`));
            eval(`div${value}`).append(eval(`input${value}`));
        }
        array.forEach(appendLabels);
        // Create a check form (div)
        let divCheck = document.createElement("div");
        divCheck.classList.add("form-check");
        let inputCheck = document.createElement("input");
        inputCheck.classList.add("form-check-input");
        inputCheck.setAttribute("id", id_for_input_check);
        inputCheck.setAttribute("required", "");
        inputCheck.setAttribute("type", "checkbox");
        let labelCheck = document.createElement("Label");
        labelCheck.classList.add("form-check-label");
        labelCheck.setAttribute("for", "check");
        labelCheck.innerHTML = "Privat";
        divCheck.append(inputCheck);
        divCheck.append(labelCheck);
        // Append all 6 divs to the form
        function appendDivs(value) {
            form.append(eval(`div${value}`));
        }
        array.forEach(appendDivs);
        // Append the checkbox input to the form
        form.append(divCheck);
        // Append the form input to the modal body
        divModalBody.appendChild(form);
        //----------------------------------------------------------------------
        // Create the Footer for the Content
        let divModalFooter = document.createElement("div");
        let closeButtonDivModalFooter = document.createElement("button");
        closeButtonDivModalFooter.setAttribute("class", "btn btn-secondary");
        closeButtonDivModalFooter.setAttribute("id", "close_button");
        closeButtonDivModalFooter.setAttribute("data-dismiss", "modal");
        closeButtonDivModalFooter.setAttribute("type", "button");
        closeButtonDivModalFooter.innerHTML = "Close";
        let aEditButtonDivModalFooter = document.createElement("a");
        aEditButtonDivModalFooter.setAttribute("href", `javascript:editCard('card_${type}_${privateOrPublic}_${num}','recipient-name-${type}-${num}', 'recipient-nachname-${type}-${num}','recipient-strasse-${type}-${num}','recipient-plz-${type}-${num}','recipient-stadt-${type}-${num}','recipient-land-${type}-${num}','${id_for_input_check}')`);
        let editButtonDivModalFooter = document.createElement("button");
        editButtonDivModalFooter.setAttribute("class", "btn btn-primary");
        editButtonDivModalFooter.setAttribute("id", "edit_button");
        editButtonDivModalFooter.setAttribute("type", "submit");
        editButtonDivModalFooter.setAttribute("onclick", "alert('Changes saved.')");
        editButtonDivModalFooter.innerHTML = "Edit address";
        aEditButtonDivModalFooter.append(editButtonDivModalFooter);
        // divModalFooter.append(closeButtonDivModalFooter);
        divModalFooter.append(aEditButtonDivModalFooter);
        // Append the Header, the Body, and the Footer to the Content
        divModalContent.append(divModalHeader);
        divModalContent.append(divModalBody);
        divModalContent.append(divModalFooter);
        // Append the Content to the Dialog
        divModalDialog.append(divModalContent);
        // Append the Dialog to the Label
        divModalLabel.append(divModalDialog);
        // Create the delete icon
        let aEditOrDeleteSection = document.createElement("a");
        //TODO: change privateOrPublic dynamically
        aEditOrDeleteSection.setAttribute("href", `javascript:deleteElement('card_${type}_${privateOrPublic}_${num}')`);
        let iForAEditOrDeleteSection = document.createElement("i");
        iForAEditOrDeleteSection.setAttribute("class", "far fa-trash-alt fa-2x");
        iForAEditOrDeleteSection.setAttribute("id", "delete_icon");
        aEditOrDeleteSection.append(iForAEditOrDeleteSection);
        //------------------------------------------------------------------
        // Append the i (edit icon) to the card
        divCard.append(i);
        // Append the Label to the card
        divCard.append(divModalLabel);
        // Append the delete icon to the card
        divCard.append(aEditOrDeleteSection);
        // Find a place where to append the card
        let element = document.getElementById(wheretoplace);
        // Append the card there
        element.append(divCard);
        //Increment the cardsCounter
        cardsCounter++;
    }

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



app.get("*", function (req, res) {
    res.render("Error_page");
});

module.exports = app;
