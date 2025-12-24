"use client";

import { use } from "react";
import CardCustom from "./CardCustom";
import { PostType } from "@/lib/posts";
import Link from "next/link";


export default function CardClientList({ fetchPosts }: { fetchPosts: Promise<PostType[]> }) {

    const posts = use(fetchPosts);
    console.log("posts in client card list", posts);
    return (
        <div className="grid grid-cols-4 gap-1 cursor-pointer p-1.5 items-center justify-between">
            {
                posts.map((post) => (

                    <Link href={`dashboard/blog/${post.id}`} key={post.id} >
                        <CardCustom key={post.id}
                            userId={post.userId}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                        >
                        </CardCustom>
                    </Link>
                ))
            }
        </div>
    );
}