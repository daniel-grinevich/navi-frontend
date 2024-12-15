import { Products } from "@/components/products";
import { Suspense } from "react";


export default async function Home() {

  return (
    <div className="mx-3 relative">
      <h1>Menu Scaffolding</h1>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Products />
        </Suspense>
      </div>
    </div>
  );
}


// <ul>
//         {menuItems.map((item) => (
//           <li key={item.id}>
//             <h2>{item.name}</h2>
//             <p>{item.description}</p>
//             <p>Price: ${item.price.toFixed(2)}</p>
//           </li>
//         ))}
//       </ul>