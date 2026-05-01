import Posts from "../../models/post/postSchema.js";
import customRes from "../../utils/customRes.js";


const publicPost = async (req,res)=>{
    try{
        const post = await Posts.find({category:"public"}).lean()
        if(!post ||post.length === 0) return customRes(res,404,false,"","post not found")
       return customRes(res,200,true,"All public post","",post)
    }
    catch(err){
        console.log("publicPost says::",err.message)
        return customRes(res,500,false,"",err.message,"")
    }
}
export default publicPost