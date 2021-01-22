


var createError = require('http-errors');
const Joi = require('joi');
var express = require('express');
var session = require('express-session'); // for session
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const Contact = require('./models/contact');
const User = require('./models/user');
const { Seeder } = require('mongo-seeding');



// 1
// const config = {
//   database: {
//     host: '127.0.0.1',
//     port: 27017,
//     name: 'test',
//   },
//   dropDatabase: true,
// };

// // 2
// const seeder = new Seeder(config);

// //3
// seeder
//   .import(collections)
//   .then(() => {
//     // Do whatever you want after successful import
//   })
//   .catch(err => {
//     // Handle errors
//   });


// ----------------------------- Let's creaate a store for users ------------------------------------

// TODO: DB (Mongo or Postgres)
const users = [
    { id: 1, name: 'admina', password: 'admina' },
    { id: 2, name: 'normalo', password: 'normalo' }
]




 // if(!(admina)){
 //     admina
 // const admina = new User({
 //      _id: new mongoose.Types.ObjectId(), //automatically created uniq id
 //      name: 'admina',
 //      password: 'admina',
 //      isAdmin: true
 //     });

 // const normalo = new User({
 //      _id: new mongoose.Types.ObjectId(), //automatically created uniq id
 //      name: 'normalo',
 //      password: 'normalo',
 //      isAdmin: false
 //     });

 //      .save()
 //      .then(result =>{
 //      console.log(result);
 //      res.status(201).json({
 //      message: "Handling POST requests to /products",
 //      createdContact: result
 //      });
 //      })
 //      .catch(err => {
 //        console.log(err);
 //        res.status(500).json({
 //          error: err
 //        });
 //      });

 //      normalo
 //      .save()
 //      .then(result =>{
 //      console.log(result);
 //      res.status(201).json({
 //      message: "Handling POST requests to /products",
 //      createdContact: result
 //      });
 //      })
 //      .catch(err => {
 //        console.log(err);
 //        res.status(500).json({
 //          error: err
 //        });
 //      });
 // }



var app = express();
// create application/json parser
// parse application/x-www-form-urlencoded
mongoose.connect('mongodb+srv://Efim:m8ZFB7qi2eif3mk@cluster0.of3bb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
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
// app.use(expressLayouts);
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

// var engine = require('consolidate');

// app.set('views', __dirname + '/views');
// app.engine('html', engine.mustache);
// app.set('view engine', 'html');


app.get('/home', redirectLogin, (req, res) => {
    // const { user } = res.locals

    const user = users.find(user => user.id === req.session.userId)

    if(user.name=='admina'){
      res.sendFile('public/admina.html', {root: __dirname })
      // res.render('public/admina.html',{'my_object': user});
    } else{
      res.sendFile('public/normalo.html', {root: __dirname })
    }

    // res.send(`
    //    <!DOCTYPE html>
    // <html>

    // <head>
    // <title>
    //     AdViz
    // </title>
    // <link href="#" rel="shortcut icon">
    // <meta content="width=device-width, initial-scale=1" name="viewport">
    // <link crossorigin="anonymous" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" rel="stylesheet" />
    // <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    // <link href="/stylesheets/styles.css" rel="stylesheet" />
    // <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/css/bootstrap-switch-button.min.css" rel="stylesheet" />
    // <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/dist/bootstrap-switch-button.min.js">
    // </script>
    // <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js">
    // </script>
    // <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
    // <link href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" rel="stylesheet">
    // <link href="https://fonts.gstatic.com" rel="preconnect">
    // <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
    // <meta charset="utf-8">
    // <meta content="IE=edge" http-equiv="X-UA-Compatible">
    // <meta content="width=device-width, initial-scale=1" name="viewport">
    // </meta>
    // </meta>
    // </meta>
    // </link>
    // </link>
    // </link>
    // </link>
    // </meta>
    // </link>
    // </head>
    // <body>
    //         <ul class="nav justify-content-end">
    //             <li>
    //                 <h2 class="greetings">
    //                     Hello, ${user.name}!
    //                 </h2>
    //             </li>
    //             <li>${user.name == 'admina' ? `<form method = 'get' action = '/adviz/contacts'>
    //                   <input type="submit" value="Show all contacts" class="btn btn-warning"/>
    //                 </form>` : `<form method = 'get' action = '/adviz/contacts/normaloall'>
    //                   <input type="submit" value="Show all contacts" class="btn btn-warning"/>
    //                 </form>` }
    //             </li>
    //             <li>
    //                 <form method = 'get' action = '/adviz/contacts/${user.name}'>
    //                   <input type="submit" value="Show my contacts" class="btn btn-warning"/>
    //                 </form>
    //             </li>
    //             <li>
    //                 <form method = 'get' action = '/adviz/form/${user.name}'>
    //                   <input type="submit" value="Add new contact" class="btn btn-success"/>
    //                 </form>
    //             </li>
    //             <li class="nav-item">
    //             <form method = 'post' action = '/logout'>
    //               <input type="submit" name="upvote" value="Log out"  class="btn btn-danger"/>
    //             </form>
    //             </li>
    //         </ul>
    //         <div class="content">
    //             <div class="cards_main_page" id="all_cards">

    //               <div class="card-category" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/breakfast.jpg)">
    //                 Name:
    //               </div>


    //             </div>
    //             <div id="map">
    //             <h1>THE MAP IS HERE</h1>
    //             </div>
    //         </div>
    //          <script crossorigin="anonymous" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" src="https://code.jquery.com/jquery-3.5.1.slim.min.js">
    // </script>
    // <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    // <script crossorigin="anonymous" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js">
    // </script>
    // <script crossorigin="anonymous" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js">
    // </script>
    // <script>
    //         </body>
    // </html>
    // `)
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
  // Contact.find().then(document => {
    // res.status(200).json({
  //     message: "Contact fetched successfully!",
  //     contacts: documents
  //   });
  // }); // find on DB

  // res.send(contacts);
  Contact.find()
      .exec()
      .then( docs => {
        console.log(docs);
        // if(docs.length >= 0){
          res.status(200).json(docs);
        // }else{
        //   res.status(404).json({
        //     message: 'No entries found'
        //   });
        // }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
});

app.patch('/adviz/contacts/:id', (req,res,next) =>{
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Contact.update({ _id: id}, { $set: updateOps})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});



// app.get('/adviz/users/admina', (req,res) => {
//   const user = users.find(user => user.name === 'admina' && user.password === 'admina')
//   res.status(200).json({
//                 name: user.name
//               })
// });

// app.get('/adviz/users/normalo', (req,res) => {
//   const user = users.find(user => user.name === 'normalo' && user.password === 'normalo')
//   res.status(200).json({
//                 name: user.name
//               })
// });




// function createAllCards(){
// for (var i = 0; i < contacts.length; i++) {
//     let priv;
//     if(contacts[i].privacy == false){
//       priv = 'public';
//     }else{
//       priv = 'private';
//     }
//     getCard("all_cards", contacts[i].name, contacts[i].surname, contacts[i].street, contacts[i].plz, contacts[i].city, contacts[i].country, priv, contacts[i].creator, contacts[i].id);
//   }
// }


// app.get('/adviz/contacts/:creator', (req, res) => {
//   var contactsOfUser = contacts.filter(contact => contact.creator === req.params.creator);
//   if(!contactsOfUser) res.status(404).send('There are no contacts for this user');
//   res.send(contactsOfUser);
// });

app.post('/delete-contact/:id', (req,res, next) => {
  // let contact = contacts.find(contact => contact.id === parseInt(req.params.id));
     // if (!contact) return res.status(404).send('The contact with the given ID is not found.');

     // const index = contacts.indexOf(contact);
     // contacts.splice(index, 1);

     // res.redirect('/home');

      const id = req.params.id;
     Contact.remove({_id: id})
     .exec()
     .then( result => {
      res.redirect('/home');
     })
     .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
     });


});

app.post('/edit-contact/:id', (req,res,next) =>{

     // let contact = contacts.find(contact => contact.id === parseInt(req.params.id));
     // if (!contact) return res.status(404).send('The contact with the given ID is not found.');

     // const { error } = validateContact(req.body); //result.error

     // if (error) return res.status(400).send(error.details[0].message);

     // contact.name = req.body.name;
     // contact.surname = req.body.surname;
     // contact.street = req.body.street;
     // contact.plz = req.body.plz;
     // contact.city = req.body.city;
     // contact.country = req.body.country;

     // res.redirect('/home');

     // [
    // {"propName": "name", "value": "Efim"}]
    console.log(req.body);

      const id = req.params.id;
      // const updateOps = {};
      // for (const ops of req.body){
      //   updateOps[ops.propName] = ops.value;
      // }
      let privacy = false;
      if (req.body.privacy == true ){ privacy = true;}
      Contact.update({ _id: id}, { $set: {name: req.body.name, surname: req.body.surname, street: req.body.street, plz: req.body.plz, city: req.body.city, country: req.body.country, privacy: privacy}})
      .exec()
      .then(result => {
        console.log(result);
        res.redirect('/home');
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        })
      });

});

app.get('/adviz/contacts/:param', (req, res) => {
  if (req.params.param == 'admina' || req.params.param == 'normalo' ){
    // var contactsOfUser = contacts.filter(contact => contact.creator === req.params.param);
    // if(!contactsOfUser) return res.status(404).send('There are no contacts for this user');
    // res.send(contactsOfUser);


     Contact.find({ creator: req.params.param })
      .exec()
      .then( doc => {
        console.log("From database", doc);
        if (doc){
          res.status(200).json(doc);
        } else{
          res.status(404).json({message: 'No valid entry found for provided name'});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });


  } else if (req.params.param == 'normaloall') {
    // var allcontactsOfNormalo = contacts.filter(contact => contact.privacy === false || contact.creator === 'normalo');
    // if(!allcontactsOfNormalo) return res.status(404).send('There are no contacts for this user');
    // res.send(allcontactsOfNormalo);


    Contact.find({ $or: [{creator: 'normalo' }, {privacy: false}]})
      .exec()
      .then( doc => {
        console.log("From database", doc);
        if (doc){
          res.status(200).json(doc);
        } else{
          res.status(404).json({message: 'No valid entry found for provided request'});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
  }else{
      // let contact = contacts.find(contact => contact.id === parseInt(req.params.param));
      // if(!contact) return res.status(404).send('There are no contacts with a given id');
      // res.send(contact);
      const param = req.params.param
      Contact.findById(param)
      .exec()
      .then( doc => {
        console.log("From database", doc);
        if (doc){
          res.status(200).json(doc);
        } else{
          res.status(404).json({message: 'No valid entry found for provided id'});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
      }
});

app.get('/adviz/form/:param', (req, res) => {

 if (req.params.param == 'admina' ){
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
            <form method = 'post' action = '/adviz/contacts'>
            <h1> Add new contact</h1>
            <hr>
                            <div class="form-check">
                            <input type="checkbox" class="form-check-form" id="creator" name="creator">
                              <label class="form-check-label" for="creator">As normalo</label>
                            </div>

              <label class="control-label">
                                <label for="name">
                                    <b>
                                        Name:
                                    </b>
                                </label>
                            </label>
                            <input id="name" name="name" placeholder="Name" required type="text1">
                            <label class="control-label">
                                <label for="surname">
                                    <b>
                                        Nachname:
                                    </b>
                                </label>
                            </label>
                            <input id="surname" name="surname" placeholder="Nachname" required type="text1">
                            <label class="control-label">
                                <label for="street">
                                    <b>
                                        Strasse:
                                    </b>
                                </label>
                            </label>
                            <input id="street" name="street" placeholder="Strasse" required type="text1">
                            <label class="control-label">
                                <label for="plz">
                                    <b>
                                        PLZ:
                                    </b>
                                </label>
                            </label>
                            <input id="plz" name="plz" placeholder="PLZ" required type="text1">
                            <label class="control-label">
                                <label for="city">
                                    <b>
                                        Stadt:
                                    </b>
                                </label>
                            </label>
                            <input id="city" name="city" placeholder="Stadt" required type="text1">


                            <label class="control-label">
                                <label for="country">
                                    <b>
                                        Land:
                                    </b>
                                </label>
                            </label>
                            <input id="country" name="country" placeholder="Land" required type="text1">


                            <div class="form-check">
                              <input name="privacy" type="checkbox" class="form-check-form" id="privacy" >
                              <label class="form-check-label" for="privacy">Privat</label>
                            </div>

                            <button class="loginbtn" type="submit">
                                Add
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
} else if (req.params.param == 'normalo' ){
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
            <form method = 'post' action = '/adviz/contacts'>
            <h1> Add new contact</h1>
            <hr>


              <label class="control-label">
                                <label for="name">
                                    <b>
                                        Name:
                                    </b>
                                </label>
                            </label>
                            <input id="name" name="name" placeholder="Name" required type="text1">
                            <label class="control-label">
                                <label for="surname">
                                    <b>
                                        Nachname:
                                    </b>
                                </label>
                            </label>
                            <input id="surname" name="surname" placeholder="Nachname" required type="text1">
                            <label class="control-label">
                                <label for="street">
                                    <b>
                                        Strasse:
                                    </b>
                                </label>
                            </label>
                            <input id="street" name="street" placeholder="Strasse" required type="text1">
                            <label class="control-label">
                                <label for="plz">
                                    <b>
                                        PLZ:
                                    </b>
                                </label>
                            </label>
                            <input id="plz" name="plz" placeholder="PLZ" required type="text1">
                            <label class="control-label">
                                <label for="city">
                                    <b>
                                        Stadt:
                                    </b>
                                </label>
                            </label>
                            <input id="city" name="city" placeholder="Stadt" required type="text1">
                            <label class="control-label">
                                <label for="country">
                                    <b>
                                        Land:
                                    </b>
                                </label>
                            </label>
                            <input id="country" name="country" placeholder="Land" required type="text1">
                            <div class="form-check">
                              <input type="checkbox" class="form-check-form" id="privacy" name = "privacy">
                              <label class="form-check-label" for="privacy">Privat</label>
                            </div>


                            <button class="loginbtn" type="submit">
                                Add
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

} else{
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
            <form method = 'post' action = '/edit-contact/${req.params.param}'>
            <h1> Edit the contact</h1>
            <hr>


              <label class="control-label">
                                <label for="name">
                                    <b>
                                        Name:
                                    </b>
                                </label>
                            </label>
                            <input id="name" name="name" placeholder="Name" required type="text1">
                            <label class="control-label">
                                <label for="surname">
                                    <b>
                                        Nachname:
                                    </b>
                                </label>
                            </label>
                            <input id="surname" name="surname" placeholder="Nachname" required type="text1">
                            <label class="control-label">
                                <label for="street">
                                    <b>
                                        Strasse:
                                    </b>
                                </label>
                            </label>
                            <input id="street" name="street" placeholder="Strasse" required type="text1">
                            <label class="control-label">
                                <label for="plz">
                                    <b>
                                        PLZ:
                                    </b>
                                </label>
                            </label>
                            <input id="plz" name="plz" placeholder="PLZ" required type="text1">
                            <label class="control-label">
                                <label for="city">
                                    <b>
                                        Stadt:
                                    </b>
                                </label>
                            </label>
                            <input id="city" name="city" placeholder="Stadt" required type="text1">
                            <label class="control-label">
                                <label for="country">
                                    <b>
                                        Land:
                                    </b>
                                </label>
                            </label>
                            <input id="country" name="country" placeholder="Land" required type="text1">
                            <div class="form-check">
                              <input type="checkbox" class="form-check-form" id="privacy" name = "privacy">
                              <label class="form-check-label" for="privacy">Privat</label>
                            </div>


                            <button class="loginbtn" type="submit">
                                Edit
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
  }
});

app.post('/adviz/users', (req, res) =>{
  const user = new User({
      _id: new mongoose.Types.ObjectId(), //automatically created uniq id
      name: req.body.name,
      password: req.body.password,
      isAdmin: req.body.isAdmin
     });

     user
      .save()
      .then(result =>{
      console.log(result);
      res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

})

app.post('/adviz/contacts', (req,res) => {


  const { error } = validateContact(req.body); //result.error

 // console.log(users.find(user => user.id === ));

 if (req.session.userId) {

      // console.log(req.session);
     const usr = users.find(user => user.id === req.session.userId);

     // const usr2 = User.find({ _id: req.session.userId });
     // console.log(`Efim has found: ${usr2}`);

     let privacy = false;
     if (req.body.privacy == 'on') {
         privacy = true;
     } else {
         privacy = false;
     }

     let creator = 'admina';


     if (usr.name == 'admina') {


         if (req.body.creator == 'on') {
             creator = 'normalo';
         } else {
             creator = 'admina';
         }
     } else {
         creator = 'normalo';
     }

     if (error) return res.status(400).send(error.details[0].message);



     const contact = new Contact({
      _id: new mongoose.Types.ObjectId(), //automatically created uniq id
      name: req.body.name,
       surname: req.body.surname,
       street: req.body.street,
       plz: req.body.plz,
       city: req.body.city,
       country: req.body.country,
       privacy: privacy,
       creator: creator
     });

     contact
      .save()
      .then(result =>{
      console.log(result);
      res.status(201).json({
      message: "Handling POST requests to /products",
      createdContact: result
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
     res.redirect('/home');

 } else {
     console.log("There is no session id.");
 }
 // res.redirect('/home');
 });

 app.put('/adviz/contacts/:id', (req, res) => {
     let contact = contacts.find(contact => contact.id === parseInt(req.params.id));
     if (!contact) return res.status(404).send('The contact with the given ID is not found.');

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

 app.delete('/adviz/contacts/:id', (req, res) => {
     // let contact = contacts.find(contact => contact.id === parseInt(req.params.id));
     // if (!contact) return res.status(404).send('The contact with the given ID is not found.');

     // const index = contacts.indexOf(contact);
     // contacts.splice(index, 1);

     // res.send(contact);
     // res.redirect('/home');


     // DB:
     // Contact.deleteOne({_id: req.params.id}).then(result => {
     //   console.log(result);
     //   res.status(200).json({message: "Post deleted!"});
     // });
      const id = req.params.id;
     Contact.remove({_id: id})
     .exec()
     .then( result => {
      res.status(200).json(result);
     })
     .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
     });
 });

function validateContact(contact) {
  const schema = {
    name: Joi.string().required(),
    surname: Joi.string().required(),
    street: Joi.string().required(),
    plz: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    privacy: Joi.string(),
    creator: Joi.string()
  };
  return Joi.validate(contact, schema);
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



app.get("/*", function (req, res) {
    res.render('error');
});

module.exports = app;
