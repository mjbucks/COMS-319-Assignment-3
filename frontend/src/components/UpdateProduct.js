import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function UpdateProduct() {
    const [productId, setProductId] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleDisplayProduct = () => {
        fetch(`http://localhost:8081/${productId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        );
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
            console.error("Error deleting product:", error);
            setMessage(`Error deleting product with ID ${productId}.`)
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
                    onChange={(e) => setProductId(e.target.value)}
                />
            </div>
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
            <button className="btn btn-danger" onClick={handleUpdate}>Update</button>
            <div className="mt-3">{message}</div>
        </div>
    );
}

