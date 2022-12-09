const express = require('express');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const categoriesRouter = require('./routes/categories.router');
const postRouter = require('./routes/post.router');
const errorMiddleware = require('./middlewares/error.middleware');
// ...

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(categoriesRouter);
app.use(postRouter);

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;