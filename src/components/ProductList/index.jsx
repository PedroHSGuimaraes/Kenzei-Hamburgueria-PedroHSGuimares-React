import { ProductCard } from "./ProductCard";

import styles from "./style.module.scss";

export const ProductList = ({ productList, addToCart }) => {
  return (
    <section>
      <div className="container">
        <div>
          <ul>
            <div className={styles.boxCard}>
              {productList.map((product) => (
                <ProductCard
                  key={product.id}
                  addToCart={addToCart}
                  product={product}
                />
              ))}
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};
