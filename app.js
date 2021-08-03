'use strict';

require('dotenv').config()
const createError = require('http-errors');
var express = require("express")

const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const app = express();
const mongoose = require("mongoose");
const mongoLink = "mongodb+srv://Astralis:Astralis@2021@cluster0.qtnlm.mongodb.net/Astralis?retryWrites=true&w=majority"
    
    mongoose.connect( mongoLink, { useNewUrlParser: true } )
  .then(() => {
    // log.info("Connected to MongoDB", mongoLink);
    console.log("Connected to MongoDB" , mongoLink)
  })
  .catch(err => {
    // log.info("Oops something went wrong", err, mongoLink);
    console.log("Oops something went wrong", err, mongoLink)
    // process.exit(1)
  });
    // cors setup
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    // body parsing
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended:true }));
     // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('data/img'));

    app.use('/', indexRouter);

    // catch 404 and forward to error handler
    app.use(function(request, response, next) {
        next(createError(404));
    });

   // error handler
    app.use(function(error, request, response, next) {
        // set locals, only providing error in development
        response.locals.message = error.message;
        response.locals.error = request.app.get('env') === 'development' ? error : {};
        // render the error page
        response.status(error.status || 500);
        response.render('error');
    });

    const PORT = process.env.PORT || 4000

    app.listen(PORT,()=>{
        console.log(`Astralis is Listening on port: ${PORT}`)
    })

    app.listen(2000, () => {
        console.log("Server is running!\nAPI documentation: http://localhost:2000/doc")
      })
module.exports.app = app;