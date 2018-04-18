module.exports = (err, req, res) => {
    console.log(`Failed: ${req.method} ${req.url}`);
    console.log(err);
    res.status(err.status || 500).send(err);
};