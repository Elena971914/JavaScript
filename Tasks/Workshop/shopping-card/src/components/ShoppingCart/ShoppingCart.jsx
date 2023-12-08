import { getAllProducts } from "../../services/product-service";
import ShoppingCartForm from "../ShoppingCartForm/ShoppingCartForm";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { useState, useEffect } from "react";
import {ToastContainer, toast} from 'react-toastify'

function ShoppingCart() {
  let [products, setProducts] = useState([]);
  let [refreshProducts, setRefreshProducts] = useState([]);
  const totalPrice = products
    .filter((p) => p.isBought === true)
    .reduce((acc, curr) => (acc += curr.cost), 0);

  useEffect(() => {
    getAllProducts()
      .then((allProducts) => {
        setProducts(Object.values(allProducts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshProducts]);
  return (
    <section className="shopping-cart__container">
      <ShoppingCartForm setRefreshProducts={setRefreshProducts} />
      <section className="shopping-cart__items-list">
        {products.map((p) => (
          <ShoppingCartItem key={p._id} {...p} setRefreshProducts={setRefreshProducts}/>
        ))}
      </section>
      <div className="shopping-cart__total-price">
        <h1>Total Price: {totalPrice}$</h1>
      </div>
    </section>
  );
}

export default ShoppingCart;
