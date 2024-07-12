import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";
import { editBody } from "@amogh_hegde/blog-app-common";

export async function editBlog(c : Context){
    try{
        console.log("edit blog endpoint");

        const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
                
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL,
        }).$extends(withAccelerate())
    
        const body = await c.req.json();
        const input = editBody.safeParse(body);
    
        if(!input){
            return c.json({
                msg : "incorrect format of input"
            })
        }
    
        const { id } = body;

        if (!id || isNaN(parseInt(id))) {
            return c.json({ error: 'Valid post ID is required' },400);
        }

        const idParsed = parseInt(id);
        let updatePost;
    
        if(body.updatedTitle && body.updatedBody){
            updatePost = await prisma.post.update({
                where : {
                    id : idParsed,
                },
                data : {
                    title : body.updatedTitle,
                    body : body.updatedBody,
                }
            }) 
        }else if(body.updatedTitle){
            updatePost = await prisma.post.update({
                where : {
                    id : idParsed,
                },
                data : {
                    title : body.updatedTitle,
                }
            })
        }else if(body.updatedBody){
            updatePost = await prisma.post.update({
                where : {
                    id : idParsed,
                },
                data : {
                    body : body.updatedBody,
                }
            })
        }

        if(updatePost){
            return c.json({
                msg : "post updated successfully"
            })
        }
    }catch(e){
        console.log(e);
        return c.json({
            msg : "internal server error"
        },500)
    } 
}