import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true,
        default: "unauthorized"
    },
    dimensions: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    image:{
        type: [String],
        required: true,
        default: ["https://www.sriyanidresspoint.lk/product/womens-classic-hand-bag-050502902013?srsltid=AfmBOopond1VIeIgFSkRe89_tTpUuwitN9lcThhQOMDUb23zjx8Kp7if"]
    }


})

const Product = mongoose.model('products', productSchema)

export default Product;