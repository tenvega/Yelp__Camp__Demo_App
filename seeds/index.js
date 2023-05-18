const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once("open", () =>{
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)]




const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i ++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
       const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, image: 'https://source.unsplash.com/collection/483251', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu tempor magna. Etiam placerat, quam ac dictum placerat, velit purus aliquam orci, quis efficitur lorem felis quis massa. Aliquam fringilla nunc sed elementum eleifend. Donec ullamcorper massa leo, ac cursus tortor ornare nec. Quisque pulvinar metus at turpis mattis, in varius arcu posuere. Proin et sem maximus massa elementum placerat eget ut ante. Nullam sit amet venenatis velit. Proin eu erat at dui luctus scelerisque et in massa. Phasellus dignissim porttitor tellus sit amet tincidunt. Praesent tincidunt sed mi sed dignissim.',
            price
        })
        await camp.save()

    }
}

seedDB().then(() => {
  mongoose.connection.close();
});