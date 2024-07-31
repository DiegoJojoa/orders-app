import { useState } from "react";
import { useCart } from "../hooks/useCart";
import Navbar from "./Navbar";
import { apiBaseUrl } from "../api";

const CreateOrder = () => {
  //   interface Cliente {
  //     codCli: string;
  //     nombre: string;
  //   }

  //   interface Vendedor {
  //     codVend: string;
  //     nombre: string;
  //   }

  //   interface Producto {
  //     codProd: string;
  //     nombre: string;
  //     precio: number;
  //   }

  //   interface PedidoItem {
  //     producto: Producto;
  //     cantidad: number;
  //   }

  // Simular datos de clientes y vendedores
  const clientesData = [
    {
      CODCLI: "13017",
      NOMBRE: "First America",
      DIRECCION: "2005 Fifth Ave., Ste. 201",
      TELEFONO: "2125552477",
      CUPO: 7281,
      FECHACREACION: "2003-06-01 00:00:00.000",
      CANAL: "Mayorista",
      VENDEDOR: "30",
      CIUDAD: "C0007",
      PADRE: null,
    },
    {
      CODCLI: "13018",
      NOMBRE: "First Processing",
      DIRECCION: "9729 S Albany Avenue",
      TELEFONO: "9145552200",
      CUPO: 7572,
      FECHACREACION: "2003-06-01 00:00:00.000",
      CANAL: "Detallista",
      VENDEDOR: "30",
      CIUDAD: "C0008",
      PADRE: null,
    },
  ];

  const vendedoresData = [
    { CODVEND: "10", NOMBRE: "Hans Stichler", ESTADO: "Activo" },
    { CODVEND: "11", NOMBRE: "Shen Lee Woo", ESTADO: "Activo" },
  ];

  //   const [clientes, setClientes] = useState<Cliente[]>([]);
  //   const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  //   const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedVendedor, setSelectedVendedor] = useState<string>("");
  //   const [selectedProducto, setSelectedProducto] = useState<string>("");
  //   const [cantidad, setCantidad] = useState<number>(1);

  //   useEffect(() => {
  // Fetch clientes, vendedores y productos
  // fetchClientes();
  // fetchVendedores();
  // fetchProductos();
  //   }, []);

  //   const fetchClientes = async () => {
  //     const response = await fetch("/api/Cliente");
  //     const data = await response.json();
  //     setClientes(data);
  //   };

  //   const fetchVendedores = async () => {
  //     const response = await fetch("/api/Vendedor");
  //     const data = await response.json();
  //     setVendedores(data);
  //   };

  //   const fetchProductos = async () => {
  //     const response = await fetch("/api/Producto");
  //     const data = await response.json();
  //     setProductos(data);
  //   };

  const crearPedido = async (e) => {
    e.preventDefault();
    try {
      console.log("crearPedido");
      const pedido = {
        cliente: selectedCliente,
        vendedor: selectedVendedor,
        items: cart.map((item) => ({
          producto: item.codProd.trim(),
          cantidad: item.quantity ?? 0,
          precio: item.precio,
          subtotal: item.precio * (item.quantity ?? 0),
        })),
      };
      console.log("pedido", JSON.stringify(pedido));

      const response = await fetch(`${apiBaseUrl}/Pedido/RegistrarPedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      console.log("response", response.json());

      if (response.ok) {
        alert("Pedido creado con éxito");
      } else {
        alert("Error al crear el pedido");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmptyCart,
    cartTotal,
  } = useCart();

  console.log("cart", cart);
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Registrar Pedido</h3>

        {/* Pedido crear */}
        <form onSubmit={crearPedido}>
          <div className="mb-3">
            <label htmlFor="cliente" className="form-label">
              Cliente
            </label>
            <select
              id="cliente"
              className="form-select"
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
            >
              <option value="">Seleccionar Cliente</option>
              {clientesData.map((cliente) => (
                <option key={cliente.CODCLI} value={cliente.CODCLI}>
                  {cliente.NOMBRE}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="vendedor" className="form-label">
              Vendedor
            </label>
            <select
              id="vendedor"
              className="form-select"
              value={selectedVendedor}
              onChange={(e) => setSelectedVendedor(e.target.value)}
            >
              <option value="">Selecciona un vendedor</option>
              {vendedoresData.map((vendedor) => (
                <option key={vendedor.CODVEND} value={vendedor.CODVEND}>
                  {vendedor.NOMBRE}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="mb-3">
            <label htmlFor="producto" className="form-label">
              Producto
            </label>
            <select
              id="producto"
              className="form-select"
              value={selectedProducto}
              onChange={(e) => setSelectedProducto(e.target.value)}
            >
              <option value="">Selecciona un producto</option>
              {productos.map((producto) => (
                <option key={producto.codProd} value={producto.codProd}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div> */}
          <h4 className="mt-4">Productos en el Pedido</h4>

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
                            onClick={() => decreaseQuantity(product?.codProd)}
                          >
                            -
                          </button>
                          {product?.quantity}
                          <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => increaseQuantity(product?.codProd)}
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
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-dark w-40 mt-3 p-2" onClick={clearCart}>
              Vaciar Carrito
            </button>
            <button className="btn btn-dark w-40 mt-3 p-2" type="submit">
              Realizar pedido
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOrder;
