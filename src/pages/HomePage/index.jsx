import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";

export const HomePage = () => {
  const localStorageCart = JSON.parse(
    localStorage.getItem("@CartHamburgueria")
  );

  const [loading, setLoading] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(
    localStorageCart ? localStorageCart : []
  );
  const [searchProduct, setSearchProduct] = useState("");
  const [countCartItems, setCountCartItems] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("products", {
          params: {
            name_like: searchProduct,
          },
        });
        setProductList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [searchProduct]);

  useEffect(() => {
    localStorage.setItem("@CartHamburgueria", JSON.stringify(cartList));
    setCountCartItems(cartList.length);
  }, [cartList]);

  const addToCart = (product) => {
    const existingItem = cartList.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      const updatedCartList = cartList.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      toast.success("Item adicionado ao carrinho");
      setCartList(updatedCartList);
    } else {
      setCartList([...cartList, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const index = cartList.findIndex((item) => item.product.id === id);
    if (index !== -1) {
      const newCartList = [...cartList];
      if (newCartList[index].quantity > 1) {
        newCartList[index].quantity -= 1;
      } else {
        newCartList.splice(index, 1);
      }
      toast.error("Item removido do carrinho");
      setCartList(newCartList);
    }
  };

  const clearCart = () => {
    setCartList([]);
  };

  if (loading) {
    return (
      <div className="loading">
        <MoonLoader color="#36d7b7" />;
      </div>
    );
  }

  return (
    <>
      <Header
        setOpenCart={setOpenCart}
        callback={setSearchProduct}
        countCartItems={countCartItems}
      />
      <main>
        <ProductList addToCart={addToCart} productList={productList} />
        {openCart && (
          <CartModal
            clearCart={clearCart}
            removeFromCart={removeFromCart}
            cartList={cartList}
            setOpenCart={setOpenCart}
          />
        )}
        <ToastContainer />
      </main>
    </>
  );
};
