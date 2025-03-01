import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NewsFeed from "./components/NewsFeed";
// import backgroundImage from "./assets/images/news.jpg"; // ✅ Import the image

const App = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>📰 Real-Time News App</h1>
        <NewsFeed />
      </div>
    </Provider>
  );
};

export default App;
