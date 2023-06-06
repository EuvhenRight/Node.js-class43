import booksData from './routes/booksRoutes.js'
import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())

app.use('/books', booksData)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})