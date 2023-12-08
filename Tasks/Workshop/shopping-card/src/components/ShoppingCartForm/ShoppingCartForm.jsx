import { useState } from "react";
import { ReactComponent as AddIcon } from "../../assets/add-icon.svg";
import { addProductToCart } from "../../services/product-service";
import { toast } from 

function ShoppingCartForm( {setRefreshProducts }) {
  let [itemName, setItemName] = useState("");
  let [itemCost, setItemCost] = useState("");
  let [itemImgUrl, setItemImgUrl] = useState("");

  const addButtonHandler = (event) => {
    event.preventDefault();
    addProductToCart(itemName,itemCost, itemImgUrl).then(() => {
        setItemName("");
        setItemCost("");
        setItemImgUrl("")
        setRefreshProducts({})
        toast('Product Added', {type: 'success', autoClose: 2000})
    })
    .catch((err) => console.error(err));
  };
  return (
    <form>
      <div className="shopping-cart__form-control">
        <input
          type="text"
          name="item-name"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="shopping-cart__form-control">
        <input
          type="number"
          name="item-cost"
          placeholder="Cost"
          value={itemCost}
          onChange={(e) => setItemCost(e.target.value)}
        />
      </div>
      <div className="shopping-cart__form-control">
        <input
          type="text"
          name="item-image"
          placeholder="Place image url here"
          value={itemImgUrl}
          onChange={(e) => setItemImgUrl(e.target.value)}
        />
      </div>
      <div className="shopping-cart__form-control">
        <button type="submit" onClick={addButtonHandler} disabled={(!itemName||!itemCost||!itemImgUrl)}>
          <span>Add</span>
          <AddIcon />
        </button>
      </div>
    </form>
  );
}

export default ShoppingCartForm;
