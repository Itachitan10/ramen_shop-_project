const express = require('express'); 
const router = express.Router();
const port = process.env.PORT_backend || 4000

router.get('/products' , (req , res)=>{ 
const products = [
  {
    product_name: "Tonkotsu Ramen",
    description: "Rich pork bone broth with chashu",
    price: 250.00,
    category: "Ramen",
    image_url: `http://localhost:${port}/image/ramen.jpg`,
    status: "available",
    quantity : 1
  },
  {
    product_name: "Shoyu Ramen",
    description: "Soy sauce based clear broth with sliced pork and nori",
    price: 220.00,
    category: "Ramen",
    image_url: "https://www.yamachanramen.com/ramen-blog/shoyu-ramen",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Miso Ramen",
    description: "Fermented soybean paste broth with corn and butter",
    price: 230.00,
    category: "Ramen",
    image_url: "https://sudachirecipes.com/pork-miso-ramen/",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Shio Ramen",
    description: "Light salt-based broth with bamboo shoots",
    price: 210.00,
    category: "Ramen",
    image_url: "https://www.gettyimages.co.uk/photos/shio-ramen",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Spicy Tantanmen",
    description: "Sesame and chili based broth with ground pork",
    price: 260.00,
    category: "Ramen",
    image_url: "https://sudachirecipes.com/tantanmen-recipe/",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Vegetable Ramen",
    description: "Vegetable broth topped with seasonal veggies and tofu",
    price: 190.00,
    category: "Ramen",
    image_url: "https://www.betterthanbouillon.com/recipes/vegan-ramen-with-vegetables/",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Chashu Rice Bowl",
    description: "Braised pork belly served over steamed rice",
    price: 180.00,
    category: "Rice Bowl",
    image_url: "https://www.pngkey.com/detail/u2w7u2t4u2t4r5u2_chicken-chashu-rice-bowl/",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Gyoza (6pcs)",
    description: "Pan-fried pork dumplings, side dish",
    price: 120.00,
    category: "Side Dish",
    image_url: "https://stock.adobe.com/search?k=gyoza",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Karaage Chicken",
    description: "Japanese-style fried chicken, side dish",
    price: 150.00,
    category: "Side Dish",
    image_url: "https://www.shutterstock.com/search/karaage",
    status: "available",
    quantity : 1
  },
  {
    product_name: "Iced Matcha Latte",
    description: "Chilled matcha green tea with milk",
    price: 110.00,
    category: "Drinks",
    image_url: "https://www.dreamstime.com/photos-images/iced-matcha.html",
    status: "unavailable",
    quantity : 1
  }
];

res.send(products)
   
})

module.exports = router

