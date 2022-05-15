const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


//Seeding a databse. It will delete all current entries

//connect to database 
mongoose.connect('mongodb://127.0.0.1/yelp-camp');
//check if databse in connected
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({ 
            author: '6251c7e60642191de4608fe2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, 
            title: `${sample(descriptors)} ${sample(places)}`, 
            image: 'https://source.unsplash.com/collection/483251',
            description: "This is a nice campsite",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlbizn8gy/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/dlbizn8gy/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
   }) 
   await camp.save(); 
   }}
//connect and close database
seedDB().then(() => {
    mongoose.connection.close();
})