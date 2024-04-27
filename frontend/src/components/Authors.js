import React from "react";
import author1Image from "../images/max.jpg";
import author2Image from "../images/tate.jpg";

export function Authors() {
    return (
        <div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <h2>COM S 319: Construction of User Interfaces</h2>
                <p>The date is 04/27/2024. This is our assignment three project for a course taught by Dr. Abraham Aldaco at Iowa State University. In this project, Tate and Max have constructed a product catalog that is set up on a MERN webstack. This website is fully functional for users to view products, add more, update products, or delete them if they choose. Good day.</p>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
                <div style={cardStyle}>
                    <img src={author1Image} alt="Author 1" style={imageStyle} />
                    <div style={contentStyle}>
                        <h3>Max</h3>
                        <p>Contact Max: <a href="mailto:mrohrer@iastate.edu">mrohrer@iastate.edu</a></p>
                    </div>
                </div>
                <div style={cardStyle}>
                    <img src={author2Image} alt="Author 2" style={imageStyle} />
                    <div style={contentStyle}>
                        <h3>Tate</h3>
                        <p>Contact Tate: <a href="mailto:tatmyers@iastate.edu">tatmyers@iastate.edu</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    width: "40%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
};

const imageStyle = {
    width: "100%",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
};

const contentStyle = {
    padding: "20px",
};
