import Link from 'next/link';
import PostCard from '../components/PostCard';
import { PostType } from '../libs/posts';

export default async function DashboardPage() {

    // fetch api
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const postData = await fetch(`${baseURL}/posts`)
    const data: PostType[] = await postData.json();


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer p-1.5">
            {
                data.map((post) => (

                    <Link href={`dashboard/blog/${post.id}`} key={post.id} >
                        <PostCard key={post.id}
                            userId={post.userId}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                        >
                        </PostCard>
                    </Link>

                    
                ))
            }
        </div>
    );
}