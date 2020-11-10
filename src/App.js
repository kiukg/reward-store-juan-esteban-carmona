import './App.css';
import CategoryBanner from './components/CategoryBanner';
import Header from "./components/Header";
import Products from './components/Products';

function App() {
  return (
    <div className="App">
     <Header></Header>
     <CategoryBanner></CategoryBanner>
     <Products></Products>
    </div>
  );
}

export default App;
