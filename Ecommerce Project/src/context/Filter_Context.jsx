import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./Context";
import reducer from "../reducer/FilterReducer";

const filterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const initialState = {
    filter_Products: [],
    all_Products: [],
    grid_View: true,
    sorting_Value: "lowest",
    text: "",
    price: 0,
  };

  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGriDView = () => {
    dispatch({ type: "SET_GRIDVIEW" });
  };
  const setListView = () => {
    dispatch({ type: "SET_LISTVIEW" });
  };

  useEffect(() => {
    if (products) {
      dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }
  }, [products]);

  const sorting = (eventKey) => {
    dispatch({ type: "GET_SORT_VALUE", payload: eventKey });
  };

  const search = (e) => {
    dispatch({ type: "SEARCH_vALUE", payload: e.target.value });
  };
  const cateroryFilter = (data) => {
    if (data === "All") {
      dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: state.all_Products });
    } else dispatch({ type: "CATEGORY_VALUE", payload: data });
  };
  const handleCompany = (companies) => {
    dispatch({ type: "COMPANY_VALUE", payload: companies });
  };
  const colorSelection = (color) => {
    dispatch({ type: "COLOR_VALUE", payload: color });
  };

  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCTS", payload: products });
  }, [state.sorting_Value]);
  const updatePrice = (e) => {
    const price = e.target.value;
    // console.log(price); // Convert slider value to number
    dispatch({ type: "PRICE_UPDATE", payload: price });
  };

  return (
    <filterContext.Provider
      value={{
        ...state,
        setGriDView,
        setListView,
        sorting,
        search,
        cateroryFilter,
        handleCompany,
        colorSelection,
        updatePrice,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(filterContext);
};
