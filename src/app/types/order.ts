/** Opción de comisión disponible en el catálogo de precios */
export interface CommissionOption {
  label: string;
  price: number;
}

/** Categoría agrupada de tipos de comisión */
export interface CommissionCategory {
  category: string;
  options: CommissionOption[];
}

/** Comisión individual agregada a la orden */
export interface Commission {
  id: number;
  type: string;
  price: number;
  specifications: string;
}

/** Payload listo para enviar a /api/order en la siguiente fase */
export interface OrderPayload {
  name: string;
  email: string;
  commissions: Commission[];
  total: number;
}

/** Construye el objeto de orden que consumirá la API serverless */
export function buildOrderPayload(
  name: string,
  email: string,
  commissions: Commission[],
): OrderPayload {
  return {
    name: name.trim(),
    email: email.trim(),
    commissions,
    total: commissions.reduce((sum, commission) => sum + commission.price, 0),
  };
}
