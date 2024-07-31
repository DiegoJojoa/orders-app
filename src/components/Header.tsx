import { Product } from "../types";
import NavItem from "./NavItem";

type HeaderProps = {
  cart: Product[];
  removeFromCart: (id: Product["codProd"]) => void;
  increaseQuantity: (id: Product["codProd"]) => void;
  decreaseQuantity: (id: Product["codProd"]) => void;
  clearCart: () => void;
  isEmptyCart: boolean;
  cartTotal: number;
};

export default function Header({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  isEmptyCart,
  cartTotal,
}: HeaderProps) {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          {/* <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div> */}
          <ul className="col-8 col-md-3">
            <li className="font-semibold">
              <NavItem to="/">Inicio</NavItem>
            </li>
            <li>
              <NavItem to="/create-order">Crear pedido</NavItem>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Estadísticas
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="/accumulated-sales-by-department"
                  >
                    Acumulados por dpto
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/seller-commision">
                    Vendedores comisión
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmptyCart ? (
                  <p className="text-center">El carrito esta vacío</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((product) => (
                          <tr key={product?.codProd}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/tablet_default_02.jpg`}
                                alt="imagen producto genérico"
                              />
                            </td>
                            <td>{product?.nombre}</td>
                            <td className="fw-bold">${product?.precio}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  decreaseQuantity(product?.codProd)
                                }
                              >
                                -
                              </button>
                              {product?.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  increaseQuantity(product?.codProd)
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeFromCart(product?.codProd)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
