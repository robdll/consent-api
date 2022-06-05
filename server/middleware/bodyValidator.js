function bodyValidator(req, res, next) {
    const method = req.method;
    if(method !== 'POST') {
        return next();
    }
    var routeName = req.url.split('/')[1];
    const requiredProps = routeProperties[`${routeName}_${method}`];
    if(!requiredProps ) {
        return next();
    }
    const hasAllProps = requiredProps
        .map( prop => !!req.body[prop])
        .reduce( (a,b) => a && b, true);
    if(hasAllProps) {
        return next();
    } 
    const missingProps = requiredProps.filter( prop => !req.body[prop]).join(', ');
    const err = { 
        code: 400,
        detail: `Following props are missing: ${missingProps}`
    }
    console.log('err', err)
    return next(err);
}

const routeProperties = {
    users_POST: [
        'email'
    ],
    events_POST: [
        'user',
        'consents'
    ]
}

module.exports = bodyValidator;
