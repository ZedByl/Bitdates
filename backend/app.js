const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const coinsRoutes = require('./routes/coinsRoutes');
require('./config/passport')(passport);

const app = express();

app.use(express.json());
// Настройка сессий
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/events/', eventRoutes);
app.use('/api/coins/', coinsRoutes);


app.get('/api', (req, res) => {
    res.send('Добро пожаловать!');
});


// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB', err));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
