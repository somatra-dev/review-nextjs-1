"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { LoginRequest } from "@/lib/login";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password is required")
        .regex(/[A-Z]/, "Password must have one Uppercase")
        .regex(/[a-z]/, "Password must have one lowercase")
        .regex(/[0-9]/, "Password must have one number")
        .regex(/[^A-Za-z0-9]/, "Password must have one symbol")
})

export default function LoginForm() {

    const form = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })



    const loginSubmit = (data: LoginRequest) => console.log(data);
    console.log(form.watch("email"));
    console.log(form.watch("password"));

    return (
        <Card className="w-1/4">

            <CardHeader>
                <CardTitle className="text-2xl">Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage /> {/* display validation error message */}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                            <Button type="submit" className="w-full">Login</Button>
                            <Button variant="outline" type="button" className="w-full">
                                Login with Google
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">
                                Don&apos;t have an account? <a href="#">Sign up</a>
                            </p>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
