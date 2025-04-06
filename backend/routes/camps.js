const express = require('express');
const {getcamps, getcamp, createcamp, updatecamp, deletecamp} = require('../controllers/camps');

//include other resource routers
const bookingrouter = require('./bookings');

const router = express.router();

const {protect,authorize} = require('../middleware/auth');

//re-route into other resource router
router.use('/:campid/bookings/',bookingrouter);

router.route('/').get(getcamps).post(protect, authorize('admin'), createcamp);
router.route('/:id').get(getcamp).put(protect, authorize('admin'), updatecamp).delete(protect, authorize('admin'), deletecamp);

module.exports = router;
