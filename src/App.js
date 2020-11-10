import React, { useRef } from "react";
import "./App.css";
import CategoryBanner from "./components/CategoryBanner";
import Header from "./components/Header";
import Products from "./components/Products";
import {UserProvider} from "./context/context"


function App() {
  
  const modalDialog = useRef()
  return (
    <UserProvider>
      <div className="App">
        <Header modal={modalDialog}></Header>
        <CategoryBanner></CategoryBanner>
        <Products></Products>
        
      </div>
      <div className="modal"></div>
    </UserProvider>
  );
}

export default App;
