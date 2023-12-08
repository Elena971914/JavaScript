import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  let name = 'eli'
  return (
    <div className="App">
      <ShoppingCart />
      <ToastContainer />
    </div>
  );
}

export default App;
