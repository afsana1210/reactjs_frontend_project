import { createContext, useReducer } from "react";
import githubRducer from "./GithubReducer";

const GithubContext = createContext();
const REACT_APP_GITHUB_URL = "https://api.github.com";

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubRducer, initialState);

  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${REACT_APP_GITHUB_URL}/users`);
    const data = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
