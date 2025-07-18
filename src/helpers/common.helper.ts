export function calculateDiscountedPrice(mrp: number, discount: number) {
    return mrp-((mrp*discount)/100)
}