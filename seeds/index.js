const mongoose = require('mongoose');
const products = require('./products');
const { areas, descriptors } = require('./seedHelpers');
const Product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/quetzalli', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    
    console.log("Database connected");
}); 

const seedDb = async () => {
    await Product.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const product = new Product({
            author: '600f92e1d7984d3780eee49a',
            title: 'Playera',
            price: 10,
            images: [
                {
                  url: 'https://res.cloudinary.com/rbst/image/upload/v1620696330/rbst/iwpfgtyweeppdjxmiise.png',
                  filename: 'rbst/iwpfgtyweeppdjxmiise'
                },
                {
                  url: 'https://res.cloudinary.com/rbst/image/upload/v1620696332/rbst/orfsthqg67djgtybq2xs.png',
                  filename: 'rbst/orfsthqg67djgtybq2xs'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, magni adipisci iure enim quam officia tempore blanditiis et id officiis architecto, possimus consectetur iste ut. Repudiandae rem sint assumenda maiores?'
            
        });
        await product.save();
           
    }
    
    
}

seedDb().then(() => {
    mongoose.connection.close();
});