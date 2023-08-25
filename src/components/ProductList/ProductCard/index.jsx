import styles from "./style.module.scss";
export const ProductCard = ({ product, addToCart }) => {
  return (
    <li>
      <div className={styles.boxProductCard}>
        <div>
          <img src={product.img} alt={product.name} />
        </div>
        <div className={styles["boxProductCard--container"]}>
          <h3 className="heading heading__three">{product.name}</h3>
          <span className="body">{product.category}</span>
          <p className="body--bolt">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <button onClick={() => addToCart(product)}>Adicionar</button>
        </div>
      </div>
    </li>
  );
};
