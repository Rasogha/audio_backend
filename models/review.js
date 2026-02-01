import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({ // one email can give only one review 
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    profilePicture:{
        type: String,
        required: true,
        default: "https://www.vecteezy.com/free-vector/default-profile-picture"
    },
    isApproved:{  //shouldn't display review until admin approves
        type: Boolean,
        required: true,
        default: false
    }
})

const Review = mongoose.model('reviews', reviewSchema)

export default Review