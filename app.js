import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";

function App({ snacks, drinks, addItem }) {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/"  element={<Home snacks={snacks} drinks={drinks} />} />
       
      <Route path="/snacks" element={<Menu items={snacks} title="Snacks" />} />
      <Route path="/drinks" element={<Menu items={drinks} title="Drinks" />} />
      <Route path="/snacks/:id" element={<Snack items={snacks} />} />
      <Route path="/drinks/:id" element={<Drink items={drinks} />} />
      <Route path="/add" element={<AddItem addItem={addItem} />} />
    </Routes>
    </BrowserRouter>    
  );
}
  
 

export default App;
