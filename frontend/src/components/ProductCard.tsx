import type { IProduct } from "../types/IProduct.ts";

type ProductCardProps = {
        product: IProduct;
};

function ProductCard({ product }: ProductCardProps) {
        return (
                <div style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "250px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                        <img
                                src={product.imageLink}
                                alt={product.name}
                                style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
                        />

                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p><strong>{product.price.toFixed(2)} €</strong></p>
                        <p>{product.status}</p>
                </div>
        );
}

export default ProductCard;