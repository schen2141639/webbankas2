const express = require("express");
const session = require("express-session");
const exphbs = require('express-handlebars');
const path = require("path");
const port = process.env.port || 3000;
const app = express();

app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

// Middleware for express
app.use(express.json());
//app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log(`User details are: `);
  // console.log(req.user);
  console.log(app.sessions, "$$$$$$$$")
  console.log("Entire session object:");
  console.log(req.session);

  // console.log(`Session details are: `);
  // console.log(req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
