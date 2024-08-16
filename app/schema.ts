import prisma from "@/lib/prisma";
import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().trim().min(1),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email()
        .refine(async (email) => {
            const count = await prisma.user.count({
                where: {
                    email: email,
                },
            });

            return count < 1;
        }, "User already exists"),
    password: z.string().min(6),
});
