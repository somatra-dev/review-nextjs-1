import { PostType } from "../libs/posts";

function PostCard({
    userId = 0,
    id = 0,
    title = "No title",
    body = "No body",
}: PostType) {
    return (
        <div className="flex flex-col rounded-md border bg-gray-200 p-2">
            <h2 className="font-extrabold">{userId} | {id}</h2>
            <h4 className="font-extrabold">Title: {title}</h4>
            <p>Body: {body}</p>
        </div>
    )
}
export default PostCard;
