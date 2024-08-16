"use server";

import prisma from "@/lib/prisma";
import { RegisterSchema } from "../schema";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

// type NewUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export type RegisterSuccess = {
    success: true;
};

export type RegisterFail = {
    success: false;
    errors: Zod.ZodFormattedError<
        {
            name: string;
            email: string;
            password: string;
        },
        string
    >;
};

export type RegisterResult = RegisterSuccess | RegisterFail;

export default async function registerUser(
    formData: FormData
): Promise<RegisterResult> {
    "use server";
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    const parsedResult = await RegisterSchema.safeParseAsync(data);

    if (parsedResult.success) {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(parsedResult.data.password, salt);

        const data = { ...parsedResult.data, password: hash, salt: salt };

        await prisma.user.create({
            data: data,
        });

        console.log("success");

        revalidatePath("/");

        return {
            success: true,
        };
    }

    const formattedErrors = parsedResult.error.format();
    return { success: false, errors: formattedErrors };
}
