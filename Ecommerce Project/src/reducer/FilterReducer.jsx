function FilterReducer(state, action) {
  const { all_Products } = state;

  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_Products: action.payload,
        all_Products: action.payload,
      };
    case "SET_GRIDVIEW":
      return {
        ...state,
        grid_View: true,
      };
    case "SET_LISTVIEW":
      return {
        ...state,
        grid_View: false,
      };
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_Value: action.payload,
      };
    case "SORTING_PRODUCTS":
      let newValue;
      let tempSort = [...action.payload];

      if (state.sorting_Value === "ascending") {
        // Sort by name alphabetically (ascending)
        newValue = tempSort.sort((a, b) => a.name.localeCompare(b.name));
      } else if (state.sorting_Value === "decending") {
        // Sort by name alphabetically (descending)
        newValue = tempSort.sort((a, b) => b.name.localeCompare(a.name));
      } else if (state.sorting_Value === "lowest") {
        // Sort by price (lowest to highest)
        newValue = tempSort.sort((a, b) => a.price - b.price);
      } else if (state.sorting_Value === "highest") {
        // Sort by price (highest to lowest)
        newValue = tempSort.sort((a, b) => b.price - a.price);
      }
      return {
        ...state,
        filter_Products: newValue,
      };

    case "SEARCH_vALUE":
      const search_Term = action.payload.toLowerCase();

      // Create a temporary copy of the array
      let tempFilterProducts = [...all_Products];

      // Filter the products based on the search term
      const search_filter_Products = tempFilterProducts.filter((product) =>
        product.name.toLowerCase().includes(search_Term)
      );

      return {
        ...state,
        filter_Products: search_filter_Products,
        text: action.payload,
      };
    case "CATEGORY_VALUE":
      const categoryName = action.payload.toLowerCase(); // Ensure the category name is in lowercase

      // Create a temporary array to filter
      let tempCategoryProducts = [...all_Products];

      // Filter products by category
      const category_Filter_Value = tempCategoryProducts.filter(
        (product) => product.category.toLowerCase().includes(categoryName) // Ensure the product category matches
      );

      // Return updated state
      return {
        ...state,
        filter_Products: category_Filter_Value, // Update filtered products
        categoryName: action.payload, // Update selected category in state
      };

    case "COMPANY_VALUE":
      const companyName = action.payload.toLowerCase();
      let tempCompanyProducts = [...all_Products];
      const company_Filter_Value = tempCompanyProducts.filter(
        (product) => product.company.toLowerCase().includes(companyName) // Ensure the product category matches
      );

      return {
        ...state,
        filter_Products: company_Filter_Value, // Update filtered products
        categoryName: action.payload,
      };

    case "COLOR_VALUE":
      const filtered_Products_Colors = all_Products.filter((prod) =>
        prod.colors.some(
          (color) =>
            color.trim().toLowerCase() === action.payload.trim().toLowerCase()
        )
      );

      return {
        ...state,
        filter_Products: filtered_Products_Colors,
      };

    case "PRICE_UPDATE":
      console.log(action.payload);

      const filteredByPrice = state.all_Products.filter(
        (product) => product.price <= action.payload
      );
    
      return {
        ...state,
        price: action.payload,
        filter_Products: filteredByPrice,
      };

    default:
      console.log("Unknown action type");
      return state;
  }
}

export default FilterReducer;
