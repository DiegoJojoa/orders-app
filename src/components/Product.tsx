import type { Product } from "../types";

// en caso de que se compartan se pasan a la carpeta types
type ProductProps = {
  product: Product;
  addToCart: (item: Product) => void;
};

export default function ProductComponent({ product, addToCart }: ProductProps) {
  // console.log(guitar);
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`./public/img/tablet_default_01.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">
          {product?.nombre}
        </h3>
        <p>{product?.familia}</p>
        <p className="fw-black text-primary fs-3">$ {product?.precio}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() => addToCart(product)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
