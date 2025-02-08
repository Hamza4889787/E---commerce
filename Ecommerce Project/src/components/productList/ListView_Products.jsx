import "bootstrap/dist/css/bootstrap.min.css";

function ListView_Products({ products }) {
  return (
    <div className="container my-4">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12" key={product.id}>
            <div className="card h-100 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded-start h-100 object-fit-cover"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-success fw-bold">
                      Price: ${product.price}
                    </p>
                    <p className="card-text">
                      {product.description.length > 100
                        ? `${product.description.slice(0, 100)}...`
                        : product.description}
                    </p>
                    <div className="mt-auto">
                      <button className="btn btn-primary">Read More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListView_Products;
