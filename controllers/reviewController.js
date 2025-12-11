import Review from '../models/review.js'

export function addReview(req, res){
    if(req.user == null){
        res.status(401).json({message: "Please log in and try again"})
        return
    }

    const data = req.body

    data.name = req.user.firstName + " " + req.user.lastName
    data.profilePicture = req.user.profilePicture
    data.email = req.user.email

    const newReview = new Review(data)

    newReview.save().then(()=>{
        res.json({message: "Review added successfully. It will be displayed once approved by admin."})
    }).catch(()=>{
        res.status(500).json({message: "An error occurred while adding the review."})
    })
}

export async function getReview(req, res){ //user need to see only approved reviews, admin can see all
    const user = req.user

    try{
        const reviews = await Review.find()
        res.json(reviews)
    }catch(e){
        res.status(500).json({error: "An error occurred while fetching reviews."})
    }
}

export function deleteReview(req, res){
    const email = req.params.email

    if(req.user == null){
        res.status(401).json({message: "Please log in and try again"})
        return
    }
    if(req.user.role == "admin"){
        Review.deleteOne({email: email}).then(()=>{
            res.json({message: "Review deleted successfully"})
        }).catch(()=>{
            res.status(500).json({message: "An error occurred while deleting the review."})
        })
        return
    }
    if(req.user.role == "customer" ){
        if(req.user.email == email){
            Review.deleteOne({email: email}).then(()=>{
                res.json({message: "Review deleted successfully"})
            }).catch(()=>{
                res.status(500).json({message: "An error occurred while deleting the review."})
            })
        }else{
            res.status(403).json({message: "You are not authorized to delete this review"})
        }
    }
}

export function approveReview(req, res){
    const email = req.params.email

    if(req.user == null){
        res.status(401).json({message: "Please log in and try again"})
        return
    }
    if(req.user.role == "admin"){
       Review.updateOne(
        {email: email},
        {isApproved: true}
        ).then(()=>{
            res.json({message: "Review approved successfully"})
        }).catch(()=>{
            res.status(500).json({message: "An error occurred while approving the review."}) 
        })
    }
}