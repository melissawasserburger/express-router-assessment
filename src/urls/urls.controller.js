const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

// path = /urls
function list(req, res) {
    res.json({ data: urls });
}

// MIDDLEWARE for create, update
function validHrefProperty(req, res, next) {
    const { data: { href } = {} } = req.body;
    if (href) {
        return next();
    }
    next({ status: 400, message: `URL submission must be valid href link. Recieved: ${href}`});
}

// path = /urls/
function create(req, res) {
    const { data: { href } = {} } = req.body;
    const newUrl = {
        id: urls.length + 1,
        href: href,
    };
    urls.push(newUrl);
    res.status(201).json({ data: newUrl });
}

// MIDDLEWARE for read, update
function urlExists(req, res, next) {
    const { urlId } = req.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    if (foundUrl) {
        res.locals.url = foundUrl;
        return next();
    }
    next({ status: 404, message: `URL ID not found: ${urlId}.`});
}

// pushes new use instance to uses-data
function logUse(req, res, next) {
    const urlId = res.locals.url.id;
    const newUse = {
        id: uses.length + 1,
        urlId: urlId,
        time: Date.now(),
    };
    uses.push(newUse);
    next();
}

// path = /urls/:urlId
function read(req, res, next) {
    const url = res.locals.url;
    res.json({ data: url });
}

// path = /urls/:urlId
function update(req, res, next) {
    const url = res.locals.url;
    const { data: { href } = {} } = req.body;

    url.href = href;

    res.json({ data: url });
}

// DELETE method not allowed for /urls/:urlId
// function destroy(req, res, next) {
//     const { urlId } = req.params;
//     const index = urls.findIndex((url)=> url.id === Number(urlId));
//     urls.splice(index, 1);
//     res.sendStatus(204);
//}

module.exports = {
    list,
    create: [validHrefProperty, create],
    read: [urlExists, logUse, read],
    update: [urlExists, validHrefProperty, update],
    urlExists
}