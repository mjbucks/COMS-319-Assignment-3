import { Button } from "react-bootstrap";
import { Header } from "./components/Header";
import { CreateProduct } from "./components/CreateProduct.js"
import React, { useState } from "react";
import { DeleteProduct } from "./components/DeleteProduct.js";
import { UpdateProduct } from "./components/UpdateProduct.js";
import { ViewProducts } from "./components/ViewProducts.js";

function App() {

  const [viewer, setViewer] = useState('View');

  const handleViewerChange = (newViewer) => {
    setViewer(newViewer);
  };

  return (
    <div className="App">
      <Header/>

      <div className="d-flex justify-content-between px-5" style={{
        backgroundColor: '#849aa4',
        padding: '1%'
      }}>
        <div style={{marginLeft: '20%'}}>
          <Button variant="primary" onClick={() => handleViewerChange('Add')}>Add</Button>
        </div>
        <Button variant="danger" onClick={() => handleViewerChange('Delete')}>Delete</Button>
        <Button variant="warning" onClick={() => handleViewerChange('Update')}>Update</Button>
        <div style={{marginRight: '20%'}}>
          <Button variant="success" onClick={() => handleViewerChange('View')}>View</Button>
        </div>
      </div>

      {viewer === 'Add' && <CreateProduct/>}
      {viewer === 'Delete' && <DeleteProduct/>}
      {viewer === 'Update' && <UpdateProduct/>}
      {viewer === 'View' && <ViewProducts/>}
    </div>
  );
}

export default App;
