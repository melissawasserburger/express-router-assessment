const uses = require("../data/uses-data");
const { use } = require("./uses.router");

// path = /urls/:urlId/uses
function list(req, res, next) {
    const { urlId } = req.params;
    const filteredUses = uses.filter((use) => use.urlId === Number(urlId));
    res.json({ data: filteredUses });
}

//MIDDLEWARE for read
function useExists(req, res, next) {
    const useId = Number(req.params.useId);
    const foundUse = uses.find((use)=> use.id === useId);
    if (foundUse) {
        res.locals.use = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use ID not found: ${useId}.`
    });
}

// path = /urls/:urlId/uses/:useId
function read(req, res, next) {
    const use = res.locals.use;
    res.json({ data: use});
}
 
module.exports = {
    list,
    read: [useExists, read],
}