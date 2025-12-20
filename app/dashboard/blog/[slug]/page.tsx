import PostCard from "@/app/components/PostCard";

async function fetchPost(id: string) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
    const post = await data.json();
    return post;
}


export default async function BlogPage(
    { params }: {
        params: Promise<{ slug: string }>
    }

) {
    const { slug } = await params;
    const post = await fetchPost(slug);

    return (
        <div className="p-24 text-center">
            <PostCard key={post.id}
                userId={post.userId}
                id={post.id}
                title={post.title}
                body={post.body}
            >
            </PostCard>
        </div>
    )
}
