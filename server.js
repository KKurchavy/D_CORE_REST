const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const jwtMiddleware = require('express-jwt');

const { authRoter } = require('./routes/auth.routes');
const { usersRouter } = require('./routes/user.routes');
const { postsRouter } = require('./routes/post.routes');
const { groupsRouter } = require('./routes/group.routes');

const { initConnection } = require('./db/dbConnector');
const dotenv = require('dotenv');

const app = express();

dotenv.config({path: 'config.env'});

initConnection();

app.use(cors('*'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwtMiddleware({ secret: process.env.SECRET_KEY }).unless({path: ['/login', '/signup', '/refresh']}));

app.use('/', authRoter.getRoutes());
app.use('/users', usersRouter.getRoutes());
app.use('/posts', postsRouter.getRoutes());
app.use('/groups', groupsRouter.getRoutes());

app.listen(process.env.PORT, () => console.log('we are on 8080'));