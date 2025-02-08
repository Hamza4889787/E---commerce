import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function GridView_Products({ products }) {


  return (
    <div className="container my-4">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4" key={product.sku}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top img-fluid object-fit-cover"
                style={{ height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-success fw-bold">
                  Price: ${product.price}
                </p>
                <p className="card-text">
                  {product.description.length > 60
                    ? `${product.description.slice(0, 60)}...`
                    : product.description}
                </p>

                {console.log(product.id)}
                <div className="mt-auto">
                  <Link to={`/single-product/${product.sku}`}>
                    <button className="btn btn-primary">Read More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridView_Products;
