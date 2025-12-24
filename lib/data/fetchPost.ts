import { PostType } from "../posts";

const baseURL = process.env.NEXT_PUBLIC_API_URL;


 // fetch api
export async function fetchPosts() {
    const postData = await fetch(`${baseURL}/posts`)
    const data: PostType[] = await postData.json();
    return data;
}
export async function fetchDetailPost(id: string) {
    const data = await fetch(`${baseURL}/posts/${id}`);
    const post = await data.json();
    return post;
}
