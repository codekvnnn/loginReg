const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();


app.use(
    cookieParser(),
    cors({credentials: true, origin: 'http://localhost:3000'}),
    express.json(),
    express.urlencoded({extended: true})
);
require('dotenv').config();
// Mongoose Config
require('./config/mongoose-config');
// Routes
require("./routes/userRoutes")(app);

app.listen(8000, () => console.log("Server running on port 8000"));
