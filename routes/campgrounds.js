const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utilities/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage});

const Campground = require('../models/campground');


//Route for campground index
router.get('/', catchAsync(campgrounds.index));


//end point for posting new campground form
router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    

//Route for new campground 
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

//show route for a details page
router.get('/:id', catchAsync(campgrounds.showCampground));

//edit a campground 
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

//update the campground
router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));

//delete a campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
