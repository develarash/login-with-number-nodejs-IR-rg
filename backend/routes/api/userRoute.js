import express from "express";
import verifyJWT from "../../middleware/verifyJWT.js";
const router= express.Router();
// PUBLIC ROUTES



// PROTECTED ROUTES 
router.use(verifyJWT)
router.get("/",(req,res)=>{
    res.json({user:"userdata"})
})


export default router;  