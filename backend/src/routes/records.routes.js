const {Router} = require('express');

const RecordsController = require('../controllers/RecordsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const recordsRoutes = Router();
const recordsController = new RecordsController();

recordsRoutes.post('/:id', ensureAuthenticated, recordsController.create);
recordsRoutes.get('/feed/:id', ensureAuthenticated, recordsController.getFeedRecords);
recordsRoutes.get('/:id', ensureAuthenticated, recordsController.getUserRecords);
recordsRoutes.delete('/:id', ensureAuthenticated, recordsController.delete);
recordsRoutes.put('/:id', ensureAuthenticated, recordsController.update);

module.exports = recordsRoutes;
