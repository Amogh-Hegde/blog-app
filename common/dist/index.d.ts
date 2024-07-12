import z from "zod";
export declare const signUpBody: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type signUpBody = z.infer<typeof signUpBody>;
export declare const siginInBody: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type siginInBody = z.infer<typeof siginInBody>;
export declare const PostBody: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
}, {
    title: string;
    body: string;
}>;
export type PostBody = z.infer<typeof PostBody>;
export declare const editBody: z.ZodObject<{
    id: z.ZodString;
    updatedTitle: z.ZodOptional<z.ZodString>;
    updatedBody: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    updatedTitle?: string | undefined;
    updatedBody?: string | undefined;
}, {
    id: string;
    updatedTitle?: string | undefined;
    updatedBody?: string | undefined;
}>;
export type editBody = z.infer<typeof editBody>;
