function ProductReducer(state, action) {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }
  if (action.type === "API_ERROR") {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }
  if (action.type === "MY_API_DATA") {
    const featureData = action.payload.filter(
      (curElement) => curElement.featured
    );
    return {
      ...state,
      isLoading: false,
      products: action.payload,
      featureProducts: featureData,
    };
  }
  if (action.type === "MY_SINGLE_PRODUCT_DATA") {
    return {
      ...state,
      isSingleLoading: false,
      singleProducts: action.payload,
    };
  }
  if (action.type === "SET_SINGLE_LOADING") {
    return {
      ...state,
      isSingleLoading: true,
      isError: false,
    };
  }
}

export default ProductReducer;
