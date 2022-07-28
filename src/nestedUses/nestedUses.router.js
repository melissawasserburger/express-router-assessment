const router = require("express").Router({mergeParams: true});
const controller = require("./nestedUses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// root path = "/urls/:urlId/uses"
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:useId").get(controller.read).delete(controller.delete).all(methodNotAllowed);

module.exports = router;
