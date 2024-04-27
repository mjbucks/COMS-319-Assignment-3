import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState("");
    const [productId, setProductId] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts(); // Initial fetch
        const intervalId = setInterval(fetchProducts, 5000); // Poll every 5 seconds (adjust as needed)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (productId) { // Only fetch product data if productId is not empty
            handleDisplayProduct();
        }
    }, [productId]);

    const handleDisplayProduct = () => {
        fetch(`http://localhost:8081/${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error("Error fetching product:", error));
    };

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
            <h2>Search For Product By ID</h2>
            <div className="container">
                <div className="mb-3">
                    <label htmlFor="productId" className="form-label">Product ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productId"
                        value={productId}
                        onChange={(e) => {
                            setProductId(e.target.value);
                            handleDisplayProduct(); 
                        }}
                    />
        </div>
                </div>
                {product && (
                    <div>
                        <div className="col-md-1">
                            <img src={product.image} className="img-fluid rounded-start" alt={product.title} />
                        </div>
                        <h3>Product Details:</h3>
                        <p>Title: {product.title}</p>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                    </div>
                )}
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
