import { useState } from "react";
import { apiBaseUrl } from "../api";
import { AccumulatedSalesByDepartment as AccumulatedSalesByDepartmentType } from "../types";
import Navbar from "./Navbar";

const AccumulatedSalesByDepartment = () => {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [ventas, setVentas] = useState<
    AccumulatedSalesByDepartmentType[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchVentas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/Pedido/ConsultarVentaAcumuladaPorDepartamento?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
      );
      const data = await response.json();
      const ventas: AccumulatedSalesByDepartmentType[] = data.data;
      setVentas(ventas);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-4">
        <h3>Ventas Acumuladas por Departamento</h3>
        <div className="mb-3">
          <label htmlFor="codDepartamento" className="form-label">
            Código de Departamento
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="fechaInicio" className="form-label">
            Fecha Inicio
          </label>
          <input
            type="date"
            className="form-control"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaFin" className="form-label">
            Fecha Fin
          </label>
          <input
            type="date"
            className="form-control"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleFetchVentas}>
          Obtener Ventas
        </button>

        <table className="table mt-4">
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Total Ventas</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2}>Cargando...</td>
              </tr>
            ) : ventas?.length === 0 || ventas == null ? (
              <tr>
                <td colSpan={2}>No hay resultados que mostrar</td>
              </tr>
            ) : (
              ventas?.map((venta) => (
                <tr key={venta.departamento}>
                  <td>{venta.departamento}</td>
                  <td>${venta.ventasAcumuladas.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccumulatedSalesByDepartment;
