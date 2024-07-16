import { z } from "zod"
export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    status: z.string(),
    url: z.string().optional() 
})

export type Task = z.infer<typeof taskSchema>