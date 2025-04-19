const express = require('express');
const app = express();
const authRouter = require('./router/authRoute');
const databaseConnect = require('./config/database');
const cookieParser = require('cookie-parser');

databaseConnect();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth/', authRouter)

app.use('/', (req, res) => {
    res.status(200).json({data: 'JWTauth server'});
});

module.exports = app;