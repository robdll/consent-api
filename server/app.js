require('dotenv').config();
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.set('port', port); 

app.use('/', (req, res) => {
    return res.status(200).json({ code: 200 });
} );

// Listen on provided port, on all network interfaces.
app.listen(port, () => console.log(`API running on localhost:${port}`));