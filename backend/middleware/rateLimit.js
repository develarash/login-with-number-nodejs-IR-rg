import rateLimit from "express-rate-limit";


const phoneLimiter = rateLimit ({
    windowMs:3 * 60 * 1000 ,
    max : 4,
    message:async (req,res)=>{
        return {message:"بیش از حد مجاز تلاش کردید لطفا بعد از 3 دقیقه دباره تلاش کنید ."}
    },
    standardHeaders:true,
    legacyHeaders:false
})

const codeLimiter = rateLimit({
    windowMs:2 * 60 * 1000 ,
    max : 3,
    message:async (req,res)=>{
        return {message:"بیش از حد مجاز تلاش کردید لطفا بعد از 3 دقیقه دباره تلاش کنید ."}
    },
    standardHeaders:true,
    legacyHeaders:false
});

export { codeLimiter, phoneLimiter}