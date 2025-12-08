const {Router} = require("express");

const GroupsController = require("../controllers/GroupsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const groupsRoutes = Router();
const groupsController = new GroupsController();

groupsRoutes.post("/", ensureAuthenticated, groupsController.create);
groupsRoutes.put("/:id", ensureAuthenticated, groupsController.update);
groupsRoutes.delete("/:id", ensureAuthenticated, groupsController.delete);
groupsRoutes.post("/join/:code", ensureAuthenticated, groupsController.join);
groupsRoutes.post("/leave/:id", ensureAuthenticated, groupsController.leave);
groupsRoutes.post("/add-admin/:id", ensureAuthenticated, groupsController.addAdmin);
groupsRoutes.post("/remove-admin/:id", ensureAuthenticated, groupsController.removeAdmin);
groupsRoutes.get("/members/:id", ensureAuthenticated, groupsController.listMembers);

module.exports = groupsRoutes;