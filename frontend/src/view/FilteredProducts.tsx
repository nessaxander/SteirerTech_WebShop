import type {IProduct} from "../types/IProduct.ts";
import '../css/products.css'
import ProductCard from "../components/ProductCard.tsx";

type Probs = {
    currentSearch : string;
    products : IProduct[]
}

const FilteredProducts = ({currentSearch, products}:Probs) => {
    let filteredProducts : IProduct[] = products;

    if (currentSearch) {
        filteredProducts = filteredProducts.filter(p => {
            return p.name.toLowerCase().includes(currentSearch.toLowerCase());
        });
    }

    if (currentSearch.length == 0) {
        filteredProducts = products;
    }

    return (
        <>
            <div id="filteredProducts">
                {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default FilteredProducts;