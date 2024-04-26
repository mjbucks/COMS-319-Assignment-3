import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export function DeleteProduct() {
    const [productId, setProductId] = useState("");
    const [message, setMessage] = useState("");

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
        })
        .catch(error => {
            console.error("Error deleting product:", error);
            setMessage(`Error deleting product with ID ${productId}.`);
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
                    onChange={(e) => setProductId(e.target.value)}
                />
            </div>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <div className="mt-3">{message}</div>
        </div>
    );
}
