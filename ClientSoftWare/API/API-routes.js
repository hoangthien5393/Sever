// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub on Tan Phat TPE',
    });
});
// Import contact controller
var contactController = require('./contactController');
// Contact routes
router.route('/Card/:id')
        .get(contactController.CardView)
        .post(contactController.CardNew)
        .put(contactController.CardUpdate)
        .delete(contactController.CardDelete);

router.route('/Device/:id')
        .get(contactController.DeviceView)
        .post(contactController.DeviceNew)
        .put(contactController.DeviceUpdate)
        .delete(contactController.DeviceDelete);

router.route('/Registered/:id')
        .get(contactController.RegisterView)
        .post(contactController.RegisterNew)
        .put(contactController.RegisterUpdate)
        .delete(contactController.RegisterDelete);

router.route('/Separate/:id/:DeviceID')
        .get(contactController.SeparateView)
        .post(contactController.SeparateNew)
        .put(contactController.SeparateUpdate)
        .delete(contactController.SeparateDelete);

router.route('/CardEvent/:id')
        .get(contactController.CardEventView)
        .post(contactController.CardEventNew)
        .put(contactController.CardEventView)
        .delete(contactController.CardEventDelete);


// Export API routes
module.exports = router;