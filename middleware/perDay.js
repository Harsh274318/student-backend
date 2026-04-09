import rateLimit from "express-rate-limit";

const perDay = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message: "Too many requests, try later"
})
export default perDay