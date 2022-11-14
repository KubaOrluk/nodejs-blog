const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const storeCommentController = require('./controllers/comments');
const getPostController = require('./controllers/getPost');
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");
const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");


const loginaController = require("./controllers/loginA");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const loginAdminController = require('./controllers/loginAdmin');
const redirectIfAuthenticatedAdmin = require('./middleware/redirectIfAuthenticatedAdmin');
const deleteCommnetController = require('./controllers/deletecomment');
const deletePostController = require('./controllers/deletepost');
const authadmin = require("./middleware/authadmin");

const app = new express();

mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(connectFlash());
app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.set('views', __dirname + '/views');

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    edge.global('authadmin', req.session.adminId)
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts/store', storePost)

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.post("/post/:id/comments", auth, storeCommentController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);


app.get("/adminlogin", redirectIfAuthenticatedAdmin, loginaController);
app.post("/adminlogin", redirectIfAuthenticatedAdmin, loginAdminController);
//admin tylko deletuje
app.post("/post/:id/delete/:comment_id", authadmin, deleteCommnetController);
app.post("/post/deletepost/:id/", authadmin, deletePostController);


app.listen(4000, () => {
  console.log("App listening on port 4000");
});