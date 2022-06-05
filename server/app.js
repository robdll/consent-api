const express = require('express');
const setRouter = require('./routes/routes');

const port = process.env.PORT || 3000;
const app = express();

setRouter(app)

app.set('port', port); 
app.use('/', (req, res) => {
    return res.status(200).json({ statusCode: 200 })
});

// Listen on provided port, on all network interfaces.
app.listen(port, () => console.log(`API running on localhost:${port}`));