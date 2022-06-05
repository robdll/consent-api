require('dotenv').config();
const express = require('express');
const mysql = require('./db/mysqldb');
const testQuery = require('./db/queries').TEST_QUERY;

const port = process.env.PORT || 3000;

const app = express();
app.set('port', port); 

app.use('/', (req, res) => {
    console.log('asd')
    mysql
        .queryAsync(testQuery)
        .then(retsucc)
        .catch(reterr)
    function retsucc(s) {
        console.log('mysa', s)
        return res.status(200).json({ code: 201, s })
    }
    function reterr(e) {
        return res.status(500).json({ code: 500, e })
    }
    
});

// Listen on provided port, on all network interfaces.
app.listen(port, () => console.log(`API running on localhost:${port}`));