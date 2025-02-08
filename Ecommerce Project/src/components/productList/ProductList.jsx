import Sidebar from "./Sidebar";
import { useFilterContext } from "../../context/Filter_Context";
import GridView_Products from "./GridView_products";
import ListView_Products from "./ListView_Products";
import { FaTh, FaList } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";

function ProductList() {
  const { filter_Products, grid_View, setGriDView, setListView, sorting } =
    useFilterContext();

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div style={{ width: "100%" }}>
          {" "}
          <div className="d-flex">
            <div className="d-flex my-3 mx-3  w-100   ">
              {/* Grid View Button */}
              <button
                onClick={setGriDView}
                className="btn btn-outline-primary me-3 d-flex align-items-center"
                style={{ borderRadius: "50px", padding: "10px 20px" }}
              >
                <FaTh size={20} className="me-2" />
                <span>Grid View</span>
              </button>

              {/* List View Button */}
              <button
                onClick={setListView}
                className="btn btn-outline-secondary d-flex align-items-center"
                style={{ borderRadius: "50px", padding: "10px 20px" }}
              >
                <FaList size={20} className="me-2" />
                <span>List View</span>
              </button>
            </div>

            {/** Select **/}

            <div className="p-3 d-flex justify-content-end align-items-center w-100">
              <Dropdown onSelect={sorting}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Select an Option
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                  <Dropdown.Item eventKey="ascending">Ascending</Dropdown.Item>
                  <Dropdown.Item eventKey="decending">Decending</Dropdown.Item>
                  <Dropdown.Item eventKey="highest">Highest</Dropdown.Item>
                  <Dropdown.Item eventKey="lowest">Lowest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="d-flex">
            {grid_View ? (
              <GridView_Products products={filter_Products} />
            ) : (
              <ListView_Products products={filter_Products} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
