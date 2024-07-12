import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";
import { PostBody } from "@amogh_hegde/blog-app-common";

export async function postBlog(c : Context){
    try {

        const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
            
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL,
        }).$extends(withAccelerate())
    
        const userId = c.get("userId");

        const postBody = await c.req.json();

        const input = PostBody.safeParse(postBody);

        if(!input.success){
            return c.json({
                msg : "wrong inputs"
            })
        }

        const result = await prisma.post.create({
            data : {
                title : postBody.title,
                body : postBody.body,
                authorId : userId,
            }
        })

        if(result){
            return c.json({
                msg : "blog posted"
            })
        }

    }catch(e){
        console.log(e);
        return c.json({
            msg : "internal server error"
        },500)
    }    
}