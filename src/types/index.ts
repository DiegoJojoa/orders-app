export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = Guitar & {
  quantity: number;
};

export type Product = {
  codProd: string;
  nombre: string;
  familia: string;
  precio: number;
  quantity?: number;
};

export type SellerCommission = {
  vendedor: string;
  comision: number;
}

export type AccumulatedSalesByDepartment = {
  departamento: string;
  ventasAcumuladas: number;
}
// export interface ICartItem extends CartItem {
//     quantity: number;
// }

// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//     quantity: number;
// };
