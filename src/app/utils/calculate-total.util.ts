import { IProduct } from "../models/product.model";

export function calculateTotalPrice(product: IProduct, quantity: number): number {

    // Precio del producto
    let priceProduct = product.price;

    // Si tiene extras, calculamos su precio
    if (product.extras) {

        let priceProductExtras = 0;
        for (const extra of product.extras) {
            // Obtenemos la opcion seleccionada
            const selectedOption = extra.options.find(option => option.selected);
            // Si la opción esta seleccionada, sumamos el precio
            priceProductExtras += selectedOption ? selectedOption.price : 0;
        }

        // acumulamos el valor
        priceProduct += priceProductExtras;

    }

    // obtenemos el total, precio x cantidad
    const total = priceProduct * quantity;

    // Fijamos el precio en dos decimales
    return +total.toFixed(2);

}