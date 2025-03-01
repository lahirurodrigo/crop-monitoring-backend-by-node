import express,{ Request, Response, NextFunction }  from 'express';
import jwt from 'jsonwebtoken';
import { Secret } from "jsonwebtoken";
import UserModel from '../model/UserModel';
import { registerUser,validateUser } from '../controllers/authController';


const router = express.Router();

router.post('/register',async(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const user : UserModel  = new UserModel(username,password,role);

    try{
        await registerUser(user);
        const token = jwt.sign({username:user.email},process.env.SECRET_KEY as Secret, {expiresIn: "10d"});
        res.status(201).json({token:token});
    }catch(e){
        console.error('Error during registration:', e);
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

})

router.post('/login',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    console.log("login called")

    const user : UserModel  = new UserModel(username,password,"USER");

    try{
        const userStatus  = await validateUser(user)
        console.log(userStatus)
        if(userStatus){
            const accessToken = jwt.sign({username:user.email},process.env.ACCESSSECRET_KEY as Secret, {expiresIn: "10m"});
            const refreshToken = jwt.sign({username:user.email},process.env.SECRET_KEY as Secret, {expiresIn: "10d"});
            console.log(accessToken)
            res.status(201).json({
                accessToken:accessToken,
                refreshToken:refreshToken
            })



        }else{
            console.log("Error still credentials match")
            res.status(401).json("Credential doesn't match");
        }

    }catch(e){
        console.log(e)
        res.status(500).json(e);
    }

})

router.post('/refresh',async(req,res)=>{
    const authHeader = req.headers.authorization;
    const token  = authHeader?.substring(7);

    if(!token){
        res.status(401).json('No Token Provided');
    }

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as { username: string, iat: number };
        const refreshToken = jwt.sign({username:payload.username},process.env.SECRET_KEY as Secret, {expiresIn: "10d"});
        res.status(201).json({refreshToken:refreshToken})
    }catch(e){
        res.status(403).json(e);
    }
})

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.substring(7);

    if (!token) {
        return res.status(401).json('No Token Provided'); // Ensure to return after response
    }

    try {
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as { username: string, iat: number };
        req.body.username = payload.username;
        next();
    } catch (e) {
        return res.status(403).json(e); // Ensure to return after response
    }
}


export default router;