import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Leaflet for the map
import { FaMapMarkerAlt } from "react-icons/fa"; // React icon for the marker
import "leaflet/dist/leaflet.css";

const Contact = () => {
  const position = [51.505, -0.09]; // Example coordinates

  return (
    <div
      className="contact-page container mt-5"
      style={{ backgroundColor: "var(--bs-light)", color: "var(--bs-dark)" }}
    >
      <h1 className="text-center mb-4">Get in Touch</h1>
      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6">
          <form action="https://formspree.io/f/{form_id}" method="POST">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="col-md-6">
          <h2 className="text-center">Our Location</h2>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
            style={{
              height: "400px",
              borderRadius: "10px",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaMapMarkerAlt
                    style={{
                      color: "#bf4f74",
                      fontSize: "24px",
                      marginRight: "5px",
                    }}
                  />
                  We are here!
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
