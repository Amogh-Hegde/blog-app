import { Hono } from "hono";
import { postBlog } from "../controller/postBlog";
import { getAllblogs } from "../controller/getAllBlogs";
import { editBlog } from "../controller/editBlog";

export const blog = new Hono();

blog.post("/post",postBlog);
blog.get("/bulk",getAllblogs);
blog.put("/edit",editBlog);
