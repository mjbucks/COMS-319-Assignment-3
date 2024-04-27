import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";

export function DeleteProduct() {
    const [productId, setProductId] = useState("");
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);

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

    const handleConfirmDelete = () => {
        setIsConfirming(true);
    };


    const handleDelete = () => {
        fetch(`http://localhost:8081/deleteItem/${productId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                setMessage(`Product with ID ${productId} deleted successfully.`);
            } else {
                setMessage(`Failed to delete product with ID ${productId}.`);
            }
            setIsConfirming(false);
        })
        .catch(error => {
            console.error("Error deleting product:", error);
            setMessage(`Error deleting product with ID ${productId}.`);
            setIsConfirming(false);
        });
    };

    return (
        <div className="container">
            <h2>Delete Product</h2>
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
            {!isConfirming ? (
                <button className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
            ) : (
                <div>
                    <p>Are you sure you want to delete this product?</p>
                    <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
                    <button className="btn btn-secondary" onClick={() => setIsConfirming(false)}>No, Cancel</button>
                </div>
            )}
            <div className="mt-3">{message}</div>
        </div>
        
    );
}
