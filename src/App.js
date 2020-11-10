import React from "react";
import "./App.css";
import CategoryBanner from "./components/CategoryBanner";
import Header from "./components/Header";
import Products from "./components/Products";
import {UserProvider} from "./context/context"


function App() {
  
  return (
    <UserProvider>
      <div className="App">
        <Header></Header>
        <CategoryBanner></CategoryBanner>
        <Products></Products>
      </div>
    </UserProvider>
  );
}

export default App;
