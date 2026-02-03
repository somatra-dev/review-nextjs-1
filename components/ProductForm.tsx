
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { createProduct, fetchCategories, uploadFile, type PlatziCategory } from "@/lib/api/platzi"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import ImageUpload from "./file-upload/image-upload"
import { useState, useEffect } from 'react';


const MAX_IMAGE_SIZE = 2 * 1024
const MAX_IMAGE_FILES = 1

const formSchema = z.object({
    name: z
        .string()
        .min(5, "Product name must be at least 5 characters.")
        .max(32, "Product name must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
    price: z
        .string()
        .refine((val) => {
            const number = Number(val);
            return !isNaN(number) && number > 0;
        }, {
            message: "Price must be a positive number.",
        }),
    categoryId: z
        .string()
        .min(1, "Please select your product category.")
        .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
            message: "Please select a valid category.",
        }),
    image: z
        .array(z.instanceof(File))
        .min(1, "Please upload at least one image.")
        .max(MAX_IMAGE_FILES, `Maximum ${MAX_IMAGE_FILES} images allowed.`)
        .refine((files) => files.every((file) => file.type.startsWith("image/")), {
            message: "Only image files are allowed.",
        })
        .refine((files) => files.every((file) => file.size <= MAX_IMAGE_SIZE), {
            message: `Each image must be less than ${(MAX_IMAGE_SIZE / 1024 / 1024).toFixed(1)}MB.`,
        }),

})

export default function ProductForm() {
    const [categories, setCategories] = useState<PlatziCategory[]>([])
    const [categoriesError, setCategoriesError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const loadCategories = async () => {
            try {
                const data = await fetchCategories()
                if (isMounted) {
                    setCategories(data)
                    setCategoriesError(null)
                }
            } catch (error) {
                if (isMounted) {
                    setCategoriesError(error instanceof Error ? error.message : "Failed to load categories.")
                }
            }
        }
        loadCategories()
        return () => {
            isMounted = false
        }
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            categoryId: "",
            image: [],
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const uploadResults = await Promise.all(data.image.map((file) => uploadFile(file)))
            const imageUrls = uploadResults.map((upload) => upload.location)

            await createProduct({
                title: data.name,
                price: Number(data.price),
                description: data.description,
                categoryId: Number(data.categoryId),
                images: imageUrls,
            })

            toast.success("Product created", {
                position: "top-right",
            })
            form.reset()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create product.", {
                position: "top-right",
            })
        }
    }

    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Product Stock</CardTitle>
                <CardDescription>
                    Help us to create product.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} >
                    <FieldGroup>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-6">
                                {/* Controller product_name */}
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-name">
                                                Product Name
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-rhf-demo-name"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Please enter product name"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                {/* End Controller product_name */}

                                {/* Controller price */}
                                <Controller
                                    name="price"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-price">
                                                Price
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-rhf-demo-price"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Please enter product price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                autoComplete="off"
                                            />

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                {/* End Controller price */}

                                {/* Controller category */}
                                <Controller
                                    name="categoryId"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                            <FieldContent>
                                                <FieldLabel htmlFor="form-rhf-select-category">
                                                    Category
                                                </FieldLabel>

                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </FieldContent>
                                            <Select
                                                name={field.name}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    id="form-rhf-select-category"
                                                    aria-invalid={fieldState.invalid}
                                                    className="min-w-30"
                                                >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent position="item-aligned">
                                                    {categories.length === 0 && !categoriesError && (
                                                        <SelectItem value="loading" disabled>
                                                            Loading categories...
                                                        </SelectItem>
                                                    )}
                                                    {categoriesError && (
                                                        <SelectItem value="error" disabled>
                                                            {categoriesError}
                                                        </SelectItem>
                                                    )}
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={String(category.id)}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    )}
                                />
                                {/* End Controller category */}
                            </div>

                            <div className="space-y-6">
                                {/* Controller description */}
                                <Controller
                                    name="description"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-description">
                                                Description
                                            </FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...field}
                                                    id="form-rhf-demo-description"
                                                    placeholder="Please enter product description"
                                                    rows={6}
                                                    className="min-h-24 resize-none"
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {field.value.length}/100 characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                {/* End Controller description */}

                                {/* Controller image */}
                                <Controller
                                    name="image"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-image">
                                                Image
                                            </FieldLabel>
                                            <ImageUpload
                                                maxFiles={MAX_IMAGE_FILES}
                                                maxSize={MAX_IMAGE_SIZE}
                                                onImagesChange={(images) =>
                                                    field.onChange(images.map((image) => image.file))
                                                }
                                                onUploadComplete={() => { }}
                                            />

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                {/* End Controller image */}
                            </div>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()} disabled={form.formState.isSubmitting}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
