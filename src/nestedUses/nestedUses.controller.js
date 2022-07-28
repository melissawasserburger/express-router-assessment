const uses = require("../data/uses-data");
const { use } = require("./nestedUses.router");

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

// path = /urls/:urlId/uses/:useId
function destroy(req, res, next) {
    const { useId } = req.params;
    const index = uses.findIndex((use) => use.id === Number(useId));
    uses.splice(index, 1);
    res.sendStatus(204);
}
 
module.exports = {
    list,
    read: [useExists, read],
    delete: [useExists, destroy],
}