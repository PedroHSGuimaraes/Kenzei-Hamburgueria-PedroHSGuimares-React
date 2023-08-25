import { useState } from "react";
import { MdSearch, MdShoppingCart } from "react-icons/md";

import Logo from "../../assets/Logo.svg";

import styles from "./style.module.scss";

export const Header = ({ callback, setOpenCart, countCartItems }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(value);
  };

  return (
    <header>
      <div className="container">
        <div className={styles.boxHeader}>
          <img src={Logo} alt="Logo Kenzie Burguer" />
          <div className={styles["boxHeader--cart"]}>
            <button
              className={styles["boxHeader--btn-cart"]}
              onClick={() => setOpenCart(true)}
            >
              <MdShoppingCart size={21} />
              <span>{countCartItems}</span>
            </button>

            <form onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                value={value}
                placeholder="Digitar Pesquisa"
                onChange={(e) => setValue(e.target.value.toLowerCase())}
              />
              <button className={styles["boxHeader--btn-search"]} type="submit">
                <MdSearch size={21} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};
