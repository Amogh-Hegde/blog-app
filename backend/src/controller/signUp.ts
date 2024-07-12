import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { z } from "zod";
import { Jwt } from "hono/utils/jwt";
import { signUpBody } from "@amogh_hegde/blog-app-common";

export async function signUp(c : Context){ 
    try{
        
        const signUpBody = await c.req.json();
        const res = signUpBody.safeParse(signUpBody);
        
        if(!res.success){
            return c.json({
                msg : "wrong format of username or password"
            },403)
        }
        
        const {name, email, password} = signUpBody;
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const result = await prisma.user.create({
            data : {
                name,
                email,
                password
            },
        })

        if(result.email){
            const secretKey = c.env.JWT_SECRET_KEY;
            const token = await Jwt.sign({name,email},secretKey);
            return c.json({
                msg : "user created successfully",
                token,
            })
        }



    }catch(e : any){
        console.log(e);
        if(e.code == "P2002"){
            return c.json({
                msg : "user already exists"
            },409)
        }
        return c.json({
            msg : "internal server error"
        },500)
    }
}
