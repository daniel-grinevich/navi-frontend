import { CategoryList } from './category_list';
async function fetchCategories() {
    setTimeout(() => 100)
    const mockData = [
        {
            id:1,
            name: "Iced Coffee",
            slug: "iced-coffee",
        },
        {
            id:2,
            name: "Hot Coffee",
            slug: "hot-coffee",
        },
        {
            id:3,
            name: "Baked Goods",
            slug: "baked-goods",
        }
    ]
    return mockData 
}

export async function CategoriesContainer() {

    const categories = await fetchCategories();
    return <div><CategoryList initialCategories={categories}/></div>;
}