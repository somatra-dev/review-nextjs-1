import CardCustom from "@/components/CardCustom";
import detailCard from "@/components/detailCard";
import { fetchDetaildetail } from "@/lib/data/fetchdetail";
import { fetchDetailPost } from "@/lib/data/fetchPost";


export default async function BlogPage(
    { params }: {
        params: Promise<{ slug: string }>
    }

) {
    const { slug } = await params;
    const detail = await fetchDetailPost(slug);


    return (
        <div className="flex justify-center items-center mt-20">
            <CardCustom key={detail.id}
                userId={detail.userId}
                id={detail.id}
                title={detail.title}
                body={detail.body}
            >
            </CardCustom>
        </div>
    )
}
