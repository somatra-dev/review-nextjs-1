export default async function page({
                                       params,
                                   }: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params;
    return (
        <div>
            <h1 class="text-2xl">Whatever URL My Post Jab ban all: {slug[0] + " " + slug[1] + " " + slug[2]}</h1>
        </div>
    );
}
