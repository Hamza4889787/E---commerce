import { FaShippingFast, FaMoneyCheckAlt, FaHeadset } from "react-icons/fa";

const Services = () => {
  return (
    <section className="text-light bg-dark py-5">
      <div className="container text-center">
        <h2 className="mb-4">Our Services</h2>
        <div className="row">
          <div className="col-md-4">
            <div
              className="card text-light mb-4"
              style={{ backgroundColor: "#000" }}
            >
              <div className="card-body">
                <FaShippingFast size={50} className="mb-3" />
                <h4>Fast Delivery</h4>
                <p>
                  Get your products delivered quickly and safely, right to your
                  doorstep.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card text-light mb-4"
              style={{ backgroundColor: "#000" }}
            >
              <div className="card-body">
                <FaMoneyCheckAlt size={50} className="mb-3" />
                <h4>Secure Payment</h4>
                <p>
                  We offer safe and secure payment options for a worry-free
                  shopping experience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card text-light mb-4"
              style={{ backgroundColor: "#000" }}
            >
              <div className="card-body">
                <FaHeadset size={50} className="mb-3" />
                <h4>24/7 Support</h4>
                <p>
                  Our customer support team is available 24/7 to assist you with
                  any queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
