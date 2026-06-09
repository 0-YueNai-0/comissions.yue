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

/** Comisión individual agregada a la orden (estado del formulario) */
export interface Commission {
  id: number;
  type: string;
  price: number;
  specifications: string;
}

/** Comisión serializada para la API /api/order */
export interface OrderApiCommission {
  id: string;
  type: string;
  price: number;
  specifications: string;
}

/** Payload listo para enviar a /api/order */
export interface OrderPayload {
  name: string;
  email: string;
  commissions: OrderApiCommission[];
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
    commissions: commissions.map((commission) => ({
      id: String(commission.id),
      type: commission.type,
      price: commission.price,
      specifications: commission.specifications,
    })),
    total: commissions.reduce((sum, commission) => sum + commission.price, 0),
  };
}
