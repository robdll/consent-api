function apiCallTracker(req, _, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`${req.method}: ${fullUrl}`);
    if(req.body && Object.keys(req.body).length)    { 
        console.log("- Payload: " + JSON.stringify(req.body));  
    }
    if(req.params && Object.keys(req.params).length)  { 
        console.log("- Params: " + JSON.stringify(req.params)); 
    }
    next();
}

module.exports = apiCallTracker;
