import { computed, Signal, signal, WritableSignal } from "@angular/core"
import { IQuantityProduct } from "./quantity-product.model"
import { IUser } from "./user.model"
import { IProduct } from "./product.model"
import { calculateTotalPrice } from "../utils/calculate-total.util"

export interface IOrder {
    _id?: string
    address?: string
    user: IUser
    products: IQuantityProduct[]
}

export class Order {

    // Atributos
    private _productsSignal: WritableSignal<IQuantityProduct[]>
    private _userSignal: WritableSignal<IUser | null>
    private _addressSignal: WritableSignal<string>
    private _numProductsSignal: Signal<number>
    private _totalOrderSignal: Signal<number>

    // Constructor
    constructor(
        products: IQuantityProduct[] = [],
        user: IUser | null = null,
        address: string = ''
    ) {
        this._productsSignal = signal(products);
        this._userSignal = signal(user);
        this._addressSignal = signal(address)
        this._numProductsSignal = computed(() => this.numProducts());
        this._totalOrderSignal = computed(() => this.totalOrder())
    }

    // Getters and setters
    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly()
    }

    public get userSignal(): Signal<IUser | null> {
        return this._userSignal.asReadonly()
    }

    public get addressSignal(): Signal<string> {
        return this._addressSignal.asReadonly()
    }

    public get numProductsSignal(): Signal<number> {
        return this._numProductsSignal
    }

    public get totalOrderSignal(): Signal<number> {
        return this._totalOrderSignal
    }

    /**
     * Añade un producto con su cantidad
     * @param product 
     * @param quantity 
     */
    public addProduct(product: IProduct, quantity: number = 1) {

        // Obtiene los productos
        const products = this._productsSignal();
        // Buscamos el producto
        const productFound = this.searchProduct(product);

        // Si existe, sumamos la cantidad
        if (productFound) {
            productFound.quantity += quantity;
        } else {
            // Sino añadimos el producto
            products.push({
                product,
                quantity
            })
        }

        // Actualiza y notifica al resto de signals
        this._productsSignal.set([...products]);

    }

    /**
     * Suma en uno la cantidad de un producto
     * @param product 
     */
    public oneMoreProduct(product: IProduct) {

        // Busca el producto
        const productFound = this.searchProduct(product);

        // Si existe el producto, se le suma la cantidad
        if (productFound) {
            productFound.quantity++;
            // Actualizamos los signals
            this._productsSignal.set([...this._productsSignal()]);
        }

    }

    /**
    * Resta en uno la cantidad de un producto
    * @param product 
    */
    public oneLessProduct(product: IProduct) {
        // Busca un producto
        const productFound = this.searchProduct(product);

        // Si existe el producto, le restamos en uno la cantidad
        if (productFound) {
            productFound.quantity--;
            // Si se queda sin cantidad, eliminamos el producto
            if (productFound.quantity == 0) {
                this.removeProduct(productFound.product);
            } else {
                this._productsSignal.set([...this._productsSignal()]);
            }
        }
    }

    /**
     * Reseteamos la orden
     */
    public resetOrder() {
        this._productsSignal.set([]);
        this._addressSignal.set('');
    }

    /**
     * Seteamos el valor del usuario
     * @param user 
     */
    public setUser(user: IUser | null) {
        this._userSignal.set(user);
    }

    /**
     * Seteamos la direccion
     * @param address 
     */
    public setAddress(address: string) {
        this._addressSignal.set(address);
    }

    /**
     * Buscamos un producto
     * @param product 
     * @returns 
     */
    private searchProduct(product: IProduct): IQuantityProduct | undefined {
        return this._productsSignal().find((quantityProduct: IQuantityProduct) => JSON.stringify(product) === JSON.stringify(quantityProduct.product));
    }

    /**
     * Calculamos el numero de productos
     * @returns 
     */
    private numProducts() {
        return this._productsSignal().reduce((sum: number, value: IQuantityProduct) => sum + value.quantity, 0)
    }

    /**
     * Calculamos el total de la orden
     * @returns 
     */
    private totalOrder() {
        return this._productsSignal().reduce((sum: number, value: IQuantityProduct) => sum + calculateTotalPrice(value.product, value.quantity), 0)
    }

    /**
     * Eliminamos un producto
     * @param product 
     */
    private removeProduct(product: IProduct) {
        this._productsSignal.update(products =>
            products.filter((quantityProduct: IQuantityProduct) => JSON.stringify(product) !== JSON.stringify(quantityProduct.product))
        )
    }

}