import { createBrowserRouter, Link } from "react-router-dom";
import App from "../App";
import ProductPage from "../Product";
import Products from "../Products";
//import Product from "../Product"


export default function router() {


    return createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [{
                path: "/", element: <Link to="/products">Products</Link>
            },
            {
                path: "/products", element: <Products />
            },
            {
                path: "/product/:productId", element: <ProductPage />
            },
            {
                path: "*", element: <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                </main>
            }
            ]
        },
    ]);
}
