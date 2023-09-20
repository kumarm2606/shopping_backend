const express =require('express'); 
const app = express();
require("dotenv").config();
const userRouter =require('./routes/router') 
const {errorHandler} = require('./middleware/error')
const cors =require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/',userRouter);
app.use(errorHandler);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running",process.env.APP_PORT)
})
