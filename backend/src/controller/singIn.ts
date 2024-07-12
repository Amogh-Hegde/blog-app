import { Context } from "hono";
import { z } from "zod";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";
import { Jwt } from "hono/utils/jwt";
import { siginInBody } from "@amogh_hegde/blog-app-common";

export async function signIn(c : Context){
    try{
        const siginInBody = await c.req.json();
        const res = siginInBody.safeParse(siginInBody);

        const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
        
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL,
        }).$extends(withAccelerate())
        
        if(!res.success){
            return c.json({
                msg : "wrong format of email"
            })
        }

        const result = await prisma.user.findUnique({
            where : {
                email : siginInBody.email,
                password : siginInBody.password
            },
            select : {
                name  :true,
                email : true,
            }
        })

        if(result){
            const secretKey = c.env.JWT_SECRET_KEY;
            const token = await Jwt.sign({name: result?.name,email: result?.email},secretKey);
            return c.json({
                msg : "sign in successful",
                token,
            })
        }else{
            return c.json({
                msg : "incorrect email or password"
            },401)
        }

    }catch(e){
        console.log(e);
        return c.json({
            msg : "internal server error"
        },500)

    }
}