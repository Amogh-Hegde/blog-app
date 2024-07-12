import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";


export async function getAllblogs(c : Context){
    try{
        const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
            
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL,
        }).$extends(withAccelerate())

        const result = await prisma.post.findMany();

        if(result){
            return c.json({
                posts : result
            })
        }
    }catch(e){
        return c.json({
            msg : "internal server error"
        },500)
    }
}