import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";

export async function middleware(c : Context, next : Next){
    try{
        const payload : string | undefined = c.req.header("Authorization");
    
        if(payload && payload.startsWith("Bearer ")){
            const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
                
            const prisma = new PrismaClient({
                datasourceUrl: DATABASE_URL,
            }).$extends(withAccelerate())
    
            const JWT_SECRET = c.env.JWT_SECRET_KEY;
            const token = payload.split(" ")[1];
            const decoded = await Jwt.verify(token,JWT_SECRET);

            if(decoded){
                const decoded = Jwt.decode(token);
                const { email } : any = decoded.payload;
    
                const user = await prisma.user.findUnique({
                    where : {
                        email,
                    },
                    select : {
                        id : true,
                    }
                })
    
                c.set("userId",user?.id);
                await next();
            }else{
                return c.json({
                    msg : "unauthorized access"
                },401)
            }
        }else{
            return c.json({
                msg : "invalid authorization header"
            },401)
        }

    }catch(e : any){
        console.log(e);
        if(e.name == "JwtTokenInvalid" || e.name == "JwtTokenSignatureMismatched"){
            return c.json({
                msg : "unauthorized access"
            },400)
        }
        return c.json({
            msg : "internal server error"
        },500)
    }
}