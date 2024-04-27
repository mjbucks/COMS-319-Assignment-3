import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function UpdateProduct() {
    const [productId, setProductId] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState(null);

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

    const handleUpdate = () => {
        fetch(`http://localhost:8081/updateItem/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "price" : newPrice
                })
        })
        .then(response => {
            if (response.ok) {
                setMessage(`Product with ID ${productId} updated successfully.`);
            } else {
                setMessage(`Failed to update product with ID ${productId}.`);
            }
        })
        .catch(error => {
            console.error("Error updating product:", error);
            setMessage(`Error updating product with ID ${productId}.`)
        });
    
    };
        return (
            <div className="container">
                <h2>Update Product</h2>
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
            <div className="mb-3">
                <label htmlFor="newPrice" className="form-label">New Price:</label>
                <input
                    type="text"
                    className="form-control"
                    id="newPrice"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                />
            </div>
            <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
            <div className="mt-3">{message}</div>
        </div>
    );
}

