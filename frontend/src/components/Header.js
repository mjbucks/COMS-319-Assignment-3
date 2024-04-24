import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

export function Header() {
    return (
        <div>
            <section className="header-main">
                <h1 style={{ textAlign: "center", paddingTop: "1%" }}>Welcome to Product Catalog </h1>
                <h3 style={{ textAlign: "center" }}>Add, Delete, Update, and View Products on our store!</h3>
            </section>
        </div>
    );
}
