require("dotenv").config();

//async errors
require("express-async-errors");
//express
const express = require("express");
const app = express();
//mongoDB
const connectDB = require("./db/connect");
//router
const productsRouter = require("./routes/products");
//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send(
        "<h1>Store API</h1> <a href = '/api/v1/products'>products route</a>"
    );
});

app.use("/api/v1/products", productsRouter);

//products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//dynamic port
const port = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Listening on Port ${port}....`));
    } catch (error) {
        console.log(error);
    }
};
start();