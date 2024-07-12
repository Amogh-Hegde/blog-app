import { Hono } from "hono";
import { signUp } from "../controller/signUp";
import { signIn } from "../controller/singIn";

export const users = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET_KEY : string,
    }
}>();

users.post("/signup",signUp);
users.post("/signin",signIn);


