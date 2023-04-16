import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
const initialState = [];

const reducer = (state, action) => {
  if (action.type === "Postdata") {
    return action.payload;
  }
};

const userData = createContext();
const Page1 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [element, setElement] = useState("");

  const value = {
    state,
    ele: element,
    setElement: setElement
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((resp) => {
        dispatch({
          type: "Postdata",
          payload: resp
        });
      });
  }, []);
  return (
    <>
      <userData.Provider value={value}>
        <PostList />
        <PostDetail />
      </userData.Provider>
    </>
  );
};
export default Page1;

const PostList = () => {
  const { state, setElement } = useContext(userData);
  console.log(state);
  const handleList = (elem) => {
    setElement(elem);
  };
  return (
    <ul>
      {state.map((elem) => {
        return (
          <li
            style={{ padding: "20px" }}
            key={elem.id}
            onClick={() => handleList(elem)}
          >
            
            {elem.title}
          </li>
        );
      })}
    </ul>
  );
};

const PostDetail = () => {
  const data = useContext(userData);
  const list = data.ele;

  return (
    <ul className="ul-body">
      <li>{list.id}</li>
      <li>{list.userId}</li>
      <li>{list.title}</li>
      <li>{list.body}</li>
    </ul>
  );
};
