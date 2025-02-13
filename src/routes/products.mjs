import { Router } from "express";

const router = Router();


router.get("/api/products", (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies); 
    console.log(req.signedCookies);
    if (req.signedCookies.testingCookieName && req.signedCookies .testingCookieName === "thisTheValueOfCookie") 
        {return res.status(200).send([{
            id:123, name:"chiken breast", price: 100
        }]);}
    return res.status(403).send({message:"cookie not found"});
});


export default router;