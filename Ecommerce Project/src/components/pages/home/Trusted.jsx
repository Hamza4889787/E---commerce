import {
  FaUsers,
  FaStar,
  FaShieldAlt,
  FaRegClock,
  FaTags,
  FaCheckCircle,
} from "react-icons/fa";

const Trusted = () => {
  return (
    <section className="text-dark bg-light py-5">
      <div className="container text-center">
        <h2 className="mb-4">Why Trust Us?</h2>
        <div className="row justify-content-center">
          <div className="col-md-2 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <FaUsers size={30} className="text-dark mb-3" />
                <h5 className="h6">Millions of Customers</h5>
                <p className="text-muted">Join millions who trust us.</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <FaStar size={30} className="text-dark mb-3" />
                <h5 className="h6">5-Star Ratings</h5>
                <p className="text-muted">Rated 5-stars for quality.</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <FaShieldAlt size={30} className="text-dark mb-3" />
                <h5 className="h6">Buyer Protection</h5>
                <p className="text-muted">Your purchases are safe.</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <FaRegClock size={30} className="text-dark mb-3" />
                <h5 className="h6">24/7 Support</h5>
                <p className="text-muted">Were here for you anytime.</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <FaTags size={30} className="text-dark mb-3" />
                <h5 className="h6">10% Discount</h5>
                <p className="text-muted">10% off on orders over $200!</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <FaCheckCircle size={30} className="text-dark mb-3" />
                <h5 className="h6">Quality Assurance</h5>
                <p className="text-muted">Guaranteed product quality.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="alert alert-info text-dark" role="alert">
            🛡️ Satisfaction guaranteed on all purchases!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
