import { Skeleton } from "./ui/skeleton";


export default function Loading() {

    return (
        <div className="flex flex-col space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer p-1.5">
            {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx}>
                    <Skeleton className="aspect-5/2 w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}