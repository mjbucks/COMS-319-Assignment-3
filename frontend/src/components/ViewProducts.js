import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function ViewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts(); // Initial fetch
        const intervalId = setInterval(fetchProducts, 5000); // Poll every 5 seconds (adjust as needed)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const fetchProducts = () => {
        fetch("http://localhost:8081/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched products:", data);
                setProducts(data);
            })
            .catch(error => console.error("Error fetching products:", error));
    };

    return (
        <div className="container">
            <h2>All Products</h2>
            {products.map(product => (
                <div key={product.id} className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-1"> {/* Adjust the size of the image column */}
                            <img src={product.image} className="img-fluid rounded-start" alt={product.title} />
                        </div>
                        <div className="col-md-9"> {/* Adjust the size of the content column */}
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">ID: {product.id}</p>
                                <p className="card-text">Price: {product.price}</p>
                                <p className="card-text">Description: {product.description}</p>
                                <p className="card-text">Category: {product.category}</p>
                                <p className="card-text">Rating: {product.rating.rate}/5 ({product.rating.count} ratings)</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
