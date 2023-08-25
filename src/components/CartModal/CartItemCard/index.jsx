import { MdDelete } from "react-icons/md";
import styles from "./style.module.scss";
export const CartItemCard = ({ product, quantity, removeFromCart }) => {
  return (
    <li className={styles.li}>
      <div className={styles.productInfo}>
        <img src={product.img} alt={product.name} />
        <div>
          <h3 className="body--bold">{product.name}</h3>
          {quantity > 1 && <span className="body">{quantity}</span>}
        </div>
      </div>
      <button
        className={styles.button}
        onClick={() => removeFromCart(product.id)}
        aria-label="delete"
        title="Remover item"
      >
        <MdDelete size={21} />
      </button>
    </li>
  );
};
