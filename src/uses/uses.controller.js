const { find } = require("../data/uses-data");
const uses = require("../data/uses-data");

function list(req, res, next) {
    res.json({ data: uses });
}

function useExists(req, res, next) {
    const { useId } = req.params;
    const foundUse = uses.find((use)=> use.id === Number(useId));
    if (foundUse) {
        res.locals.use = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use ID not found: ${useId}`,
    });
}

function read(req, res, next) {
    const use = res.locals.use;
    res.json({ data: use });
}

function destroy(req, res, next) {
    const { useId } = req.params;
    const index = uses.findIndex((use)=> use.id === Number(useId));
    uses.splice(index, 1);
    res.sendStatus(204);
}

module.exports = {
    list,
    read: [useExists, read],
    delete: [useExists, destroy],
}