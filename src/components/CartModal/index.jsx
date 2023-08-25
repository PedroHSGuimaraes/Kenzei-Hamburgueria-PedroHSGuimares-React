import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";

import styles from "./style.module.scss";

export const CartModal = ({
  cartList,
  setOpenCart,
  clearCart,
  removeFromCart,
}) => {
  const total = cartList.reduce((prevValue, { product, quantity = 1 }) => {
    const price = product?.price ?? 0;
    return prevValue + price * quantity;
  }, 0);

  return (
    <div className={styles.modalPosition} role="dialog">
      <div className={styles.modalContainer}>
        <div className={styles["modalContainer--header"]}>
          <h2>Carrinho de compras</h2>
          <button
            onClick={() => setOpenCart(false)}
            aria-label="close"
            title="Fechar"
          >
            <MdClose size={21} />
          </button>
        </div>

        <div className={styles["modalContainer--body"]}>
          <ul>
            {cartList.map((item) => (
              <CartItemCard
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.totalText}>
            <span>Total</span>
            <span>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button className={styles["btn--remove-all"]} onClick={clearCart}>
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
