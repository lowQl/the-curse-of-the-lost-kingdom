const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 80;

const indexRouter = require('./routes/index');
const manageRouter = require('./routes/manage');

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
  cookie: {secure: false},
}));
app.use(express.json());
app.use('/', indexRouter);
app.use('/manage', manageRouter);

app.listen(port, () => {
  console.log(`[Message]: Location:http://127.0.0.1:${port}`);
});
