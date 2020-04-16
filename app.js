const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

const MONGODB_URI =
  'mongodb+srv://demola:demola@cluster0-yxizt.mongodb.net/shop?retryWrites=true&w=majority';

const mongoDBStore = require('connect-mongodb-session')(session);

const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const User = require('./models/user');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'john',
          email: 'john@john.com',
          cart: {
            items: [],
          },
        });
      }
      user.save();
    });
    app.listen(3000, () => {
      console.log('PORT RUNNING on 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
