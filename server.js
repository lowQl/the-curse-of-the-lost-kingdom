const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const manageRouter = require('./routes/manage');
const apiRouter = require('./routes/api');
const db = require('./connect');
const sessionStore = new MySQLStore({}, db);

app.use('/index', express.static('views/index'));
app.use('/manage', express.static('views/manage'));
app.use('/', express.static('views/public'));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: sessionStore, // assigning sessionStore to the session
}));
app.use(cors());
app.use(express.json());
app.use('/', indexRouter);
app.use('/manage', manageRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`[Message]: Location:http://127.0.0.1:${port}`);
});
