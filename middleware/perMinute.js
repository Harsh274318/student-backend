import rateLimit from "express-rate-limit";

const perMinute = rateLimit({
    windowMs:60*1000,
    max:5,
    message:"Too many requests, try later"
})
export default perMinute