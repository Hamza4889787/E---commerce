import shoppingImage from "../../../assets/images/shoppingImage.jpg";

function HeroSection() {
  return (
    <section
      className="welcome-section d-flex align-items-center"
      style={{ margin: "100px 0" }}
    >
      <div className="container">
        <div className="row">
          {/* Left Side - Text */}
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
            <h1 className="text-secondary" style={{ fontSize: "18px" }}>
              Welcome to
            </h1>
            <h1>Hamza Store</h1>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              luctus urna sed urna ultricies ac tempor dui sagittis. In
              condimentum facilisis porta. Sed nec diam eu diam mattis viverra.
            </p>
            <a href="/shop" className="btn btn-dark mt-3 w-25">
              Shop Now
            </a>
          </div>

          {/* Right Side - Image */}
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src={shoppingImage}
              alt="Shopping"
              className="img-fluid stylish-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
