export const QUANTITY_TYPES = ["price_per_hour","price_per_piece","price_per_area"]

export function getUnitForQuantityType(quantityType) {
  if( quantityType === "price_per_hour")
    return "min"
  if( quantityType === "price_per_piece")
    return "kos"
  if( quantityType === "price_per_area")
    return "m²"
  return "ERROR"
}

export function getTotalPriceForQuantityType(price, quantity, quantityType) {
  if(quantityType === 'price_per_hour') {
    return price * (quantity/60.0)
  } else {
    return quantity * price
  }
}