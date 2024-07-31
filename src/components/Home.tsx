import Header from "./Header";
import { useCart } from "../hooks/useCart";
import ProductComponent from "./Product";

const Home = () => {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmptyCart,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmptyCart={isEmptyCart}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Productos</h2>

        <div className="row mt-5">
          {products?.map((product) => (
            <ProductComponent
              key={product?.codProd}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Diego Jojoa - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
