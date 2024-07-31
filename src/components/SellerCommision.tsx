import { useState } from "react";
import { SellerCommission } from "../types";
import { apiBaseUrl } from "../api";
import Navbar from "./Navbar";

const SellerCommision = () => {
  const [mes, setMes] = useState<number>(1);
  const [ano, setAno] = useState<number>(2024);
  const [comisiones, setComisiones] = useState<SellerCommission[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchComisiones = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/Pedido/ConsultarComisionPorVendedor?mes=${mes}&anio=${ano}`
      );
      const data = await response.json();
      const comisiones: SellerCommission[] = data.data;
      setComisiones(comisiones);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-4">
        <h3>Comisión por Vendedor</h3>
        <div className="mb-3">
          <label htmlFor="mes" className="form-label">
            Mes
          </label>
          <input
            type="number"
            className="form-control"
            id="mes"
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anio" className="form-label">
            Año
          </label>
          <input
            type="number"
            className="form-control"
            id="anio"
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFetchComisiones}
        >
          Obtener Comisiones
        </button>

        <table className="table mt-4">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Comisión</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2}>Cargando...</td>
              </tr>
            ) : comisiones?.length === 0 || comisiones == null ? (
              <tr>
                <td colSpan={2}>No hay resultados que mostrar</td>
              </tr>
            ) : (
              comisiones?.map((comision) => (
                <tr key={comision.vendedor}>
                  <td>{comision.vendedor}</td>
                  <td>${comision.comision.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellerCommision;
