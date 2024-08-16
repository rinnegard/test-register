"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerUser, { RegisterFail } from "../actions/actions";
import { useId, useState } from "react";
import { redirect } from "next/navigation";

export default function RegisterPage() {
    const [errors, setErrors] = useState<RegisterFail["errors"] | undefined>();
    const id = useId();

    async function action(formData: FormData) {
        const result = await registerUser(formData);

        if (!result.success) {
            setErrors(result.errors);
        } else {
            setErrors(undefined);
            redirect("/");
        }
    }

    return (
        <main className="container pt-4">
            <h1 className="text-center">Register</h1>
            <form
                action={action}
                className="w-full max-w-sm items-center mx-auto py-4 space-y-4"
            >
                <div>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="name"
                        id="name"
                        name="name"
                        placeholder="Name"
                    ></Input>
                    <ul>
                        {errors?.name?._errors.map((error) => {
                            return (
                                <li
                                    className="text-red-500"
                                    key={`${id}-${error}`}
                                >
                                    {error}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                    ></Input>
                    <ul>
                        {errors?.email?._errors.map((error) => {
                            return (
                                <li
                                    className="text-red-500"
                                    key={`${id}-${error}`}
                                >
                                    {error}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    ></Input>
                    <ul>
                        {errors?.password?._errors.map((error) => {
                            return (
                                <li
                                    className="text-red-500"
                                    key={`${id}-${error}`}
                                >
                                    {error}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <Button>Submit</Button>
            </form>
        </main>
    );
}
