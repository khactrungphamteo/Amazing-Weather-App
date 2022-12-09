import { useState } from "react";
import "./App.css";
import InputControl from "./components/InputControl";
import WeatherDetails from "./components/WeatherDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [coordinate, setCoordinate] = useState(null);
  // console.log(coordinate);

  return (
    <div>
      <Header />
      <InputControl setCoordinate={setCoordinate} />
      {coordinate !== null && (
        <div>
          <WeatherDetails coordinate={coordinate} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
