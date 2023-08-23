import { Router, Response , Request } from 'express';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import { makeResponse, statusCode } from '../../lib';
import { loginJoi, signupJoi } from '../../middlewares';
import { createUser, getUser,  } from '../../services'
import { Iuser } from '../../lib/interface/user';
dotenv.config();
const router = Router();

router.post("/signup", signupJoi, async(req:Request, res:Response ) =>{
    try {
        const { email, password, name, photo } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await  createUser({
            email, name,photo, password: hashedPassword
        })
        const responseData = {
            ...JSON.parse(JSON.stringify(result)),
            password: undefined
        }
        return makeResponse(req, res, statusCode.successful, true, 'Added Successfully', responseData);
        
    } catch (error) {
        const err = error instanceof Error?error : {
            message: 'An unknown error occurred'
        };
        return makeResponse(req, res, statusCode.badRequest, false, err.message);
    }
})

router.post('/login', loginJoi, async(req:Request,res:Response): Promise<number | object | null | undefined> =>{
    try {
        const { email , password } = req.body;
        const query ={
            email,
            status : {$ne : 'DELETED'},
        }
        const user = await getUser(query, {});
        
        if(user === null || ! await (bcrypt.compare(password, (user as { password: string }).password))
        )
        {
            return makeResponse(req, res, statusCode.badRequest, false, 'Invalid email or password!', undefined);
        }

        if ((user as Iuser).status === 'INACTIVE'){
            return makeResponse(req, res , statusCode.badRequest, false, 'Your Account has been blocked by Grace. Please contact support.', undefined)
        }

        const tokenData = {
            _id : (user as Iuser)._id ,
            name : (user as Iuser).name,
            email : (user as Iuser).email
        }
        const token = sign(tokenData, String(process.env.SECRET_KEY),{
            expiresIn: process.env.TOKEN_EXPIRE
        })
        
        // const { password, ...others } = user.doc; 
        // and you can use others for sending user without password 
        
    const responseData = {
        ...JSON.parse(JSON.stringify(user)),
        password: undefined
      };
      res.cookie("token", token, {
        httpOnly: true
      })
      makeResponse(req, res, statusCode.successful, true, "Login successfully", responseData);

} catch (error) {
    const err = error instanceof Error?error : {
        message: 'An unknown error occured'
    };
    return makeResponse(req, res, statusCode.badRequest, false, err.message );  
}
})

router.post('/logout', async (req: Request, res: Response): Promise<number | object | null | undefined> => {
    try {
        res.clearCookie('token');

        return makeResponse(req, res, statusCode.successful, true, 'Logged out successfully', undefined);
    } catch (error) {
        const err = error instanceof Error ? error : {
            message: 'An unknown error occurred'
        };
        return makeResponse(req, res, statusCode.badRequest, false, err.message);
    }
});

export const authRouter = router;
