import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const port = 5008;

const limiter = rateLimit({
    windowMs: 1000, // in milliseconds
    max: 2, // limit each IP to 'max' requests per 'windowMs'
    message: "Too many requests"
});

// app.use(limiter);

app.get('/', (req, res) => res.send("Hello World"));

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many accounts created from this IP, try again after 1 hour."
});

app.get('/createacc', createAccountLimiter, (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Listening on port ${port}`));