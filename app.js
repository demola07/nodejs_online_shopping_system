const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5e96f4f63818a8203091a8d6')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://demola:demola@cluster0-yxizt.mongodb.net/shop?retryWrites=true&w=majority'
  )
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
