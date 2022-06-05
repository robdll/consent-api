module.exports = errorHandler

function errorHandler(err, req, res, __) {
    if (typeof err === 'string') {
        return res.status(400).json({ detail: err });
    }
    if(typeof err === 'object' && err.code) {
        return res.status(err.code || 500).json(err);
    }
    return res.status(500).json({ type: 'error', detail: 'Unhandled Error' });
}