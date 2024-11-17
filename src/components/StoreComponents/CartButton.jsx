import { Button } from "react-bootstrap";
import Cart from "../Cart/Cart";
import { useState } from "react";


export default function CartButton() {
  const [isCart, setIsCart] = useState(false);
  return (
    <div className="d-flex justify-content-center my-5">
      <Button onClick={()=> setIsCart(true)} variant="secondary" className="text-light">See the Cart</Button>

      { isCart && <Cart /> }
    </div>
  )
}
