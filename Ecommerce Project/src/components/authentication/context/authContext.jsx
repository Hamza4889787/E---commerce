import { createContext, useContext, useReducer } from "react";
import axios from "axios";

// Initial state for the authentication
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

// Reducer function to manage state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    case "REGISTER":
      return state; // No need to change state on registration; you can just handle it in your components
    default:
      return state;
  }
};

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide state to the app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function to authenticate user and save token
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: "LOGIN",
        payload: { user: response.data.user, token: response.data.token },
      });
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
    }
  };

  // Register function to create a new user
  const register = async (username, email, password) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
    }
  };

  // Logout function to clear token and user data
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, token: state.token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
