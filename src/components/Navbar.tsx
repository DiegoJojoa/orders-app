import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <div>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <ul className="col-8 col-md-3">
              <li className="font-semibold">
                <NavItem to="/">Inicio</NavItem>
              </li>
              <li>
                <NavItem to="/">Crear pedido</NavItem>
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
                      Acumulados por Dpto
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
