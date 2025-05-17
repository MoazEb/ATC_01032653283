const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();


connectDB();

const app = express();


app.use(express.json());


app.use(cors({

    origin: "*",
    // allow all for deploy
    credentials: true
}));


app.use('/api/auth', require('./routes/auth'));

app.use('/api/admin/events', require('./routes/admin/events'));

app.use('/api/bookings', require('./routes/booking'));


app.get('/', (req, res) => {
    res.send('API is running...');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));