import { PostType } from "@/lib/posts";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CloudLightning } from "lucide-react";

export default function CardCustom({
    userId,
    id,
    body,
    title
}: PostType) {

    return (

        <div className="w-full max-w-sm text-center">
            <Card>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {body}
                </CardDescription>
                <CardContent>
                    <Button variant="destructive" size="lg">{userId} - {id} <CloudLightning></CloudLightning></Button>
                </CardContent>
            </Card>
        </div>

    )
}