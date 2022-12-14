const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const usesRouter = require("../nestedUses/nestedUses.router");

router.use("/:urlId/uses", controller.urlExists, usesRouter);

// root path = /urls
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:urlId").get(controller.read).put(controller.update).all(methodNotAllowed)

module.exports = router;