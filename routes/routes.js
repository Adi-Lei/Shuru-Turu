const express = require('express'),
    userRoutes = require('./shuruTuru');

var router = express.Router();

// router.get('/tours', userRoutes.read_tours);
router.get('/tourName/:name', userRoutes.getTour);
router.get('/tourList', userRoutes.getTours);
router.post('/createTour', userRoutes.createTour);
router.put('/tourId/:id', userRoutes.updateTour);
router.put('/site/:id', userRoutes.createSiteInPath);

router.delete('/tourId/:id/siteName/:name', userRoutes.deleteSite);
router.delete('/tourIdDelete/:id', userRoutes.deleteTour);


module.exports = router;