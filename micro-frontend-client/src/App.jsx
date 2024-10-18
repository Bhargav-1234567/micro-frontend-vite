import "./App.css";
import ComplexComponent from "./components/ComplexComponent";
// const Layout = React.lazy(() => import("layout_components/Layout"));

function App() {
  return (
    <div className="container mt-3">
      <ComplexComponent />
    </div>
  );
}

export default App;
