import express from 'express';
import routes from './routes/routes';

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.use (routes)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})