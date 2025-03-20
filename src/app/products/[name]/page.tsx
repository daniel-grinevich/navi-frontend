
export default async function ProductDetail({
    params,
}: { params: Promise<{ name: string }>
}) {
    const name = (await params).name
    return <p>Post: {name}</p>
}

