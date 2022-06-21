const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const uri = process.env.ATLAS_URI;
mongoose.connect (uri);

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user');
app.use('/user',userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
