import { Injectable, Signal } from '@angular/core';
import { IOrder, Order } from '../models/order.model';
import { IQuantityProduct } from '../models/quantity-product.model';
import { IUser } from '../models/user.model';
import { Preferences } from '@capacitor/preferences';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  private order!: Order;

  private readonly KEY_ORDER = 'ddr_key_order';

  // Signals
  public productsSignal!: Signal<IQuantityProduct[]>;
  public userSignal!: Signal<IUser | null>;
  public addressSignal!: Signal<string>;
  public numProductsSignal!: Signal<number>;
  public totalOrderSignal!: Signal<number>;

  /**
   * Iniciamos la orden
   */
  async initOrder(){

    // Obtenemos la orden
    const orderPreferences = await Preferences.get({
      key: this.KEY_ORDER
    });

    if(orderPreferences.value){

      // Convertimos la orden
      const order: IOrder = JSON.parse(orderPreferences.value);

      // Creamos la orden
      this.order = new Order(
        order.products,
        order.user,
        order.address
      );

    }else{
      // Creamos la orden vacia
      this.order = new Order();
    }

    // Signals
    this.productsSignal =  this.order.productsSignal;
    this.userSignal =  this.order.userSignal;
    this.addressSignal = this.order.addressSignal;
    this.numProductsSignal = this.order.numProductsSignal
    this.totalOrderSignal = this.order.totalOrderSignal
    
    if(!orderPreferences.value){
      // Guardamos la orden
      this.saveOrder();
    }

  }

  /**
   * Guardamos la orden
   */
  async saveOrder(){

    // Obtenemos la orden
    const order: IOrder = this.getOrder();

    // La guardamos
    await Preferences.set({
      key: this.KEY_ORDER,
      value: JSON.stringify(order)
    })

  }

  /**
   * Obtenemos la orden
   * @returns 
   */
  public getOrder(): IOrder{
    return {
      products: this.productsSignal(),
      user: this.userSignal(),
      address: this.addressSignal()
    } as IOrder
  }

  /**
   * Añade un producto con su cantidad
   * @param product 
   * @param quantity 
   */
  public addProduct(product: IProduct, quantity: number = 1){
    this.order.addProduct(product, quantity);
    this.saveOrder();
  }

  /**
   * Añade una cantidad de un producto
   * @param product 
   */
  public oneMoreProduct(product: IProduct){
    this.order.oneMoreProduct(product);
    this.saveOrder();
  }

  /**
   * Resta una cantidad de un producto
   * @param product 
   */
  public oneLessProduct(product: IProduct){
    this.order.oneLessProduct(product);
    this.saveOrder();
  }

  /**
   * Resetea la orden
   */
  public resetOrder(){
    this.order.resetOrder();
    this.saveOrder();
  }

  /**
   * Setea el usuario
   * @param user 
   */
  public setUser(user: IUser | null){
    this.order.setUser(user);
    this.saveOrder();
  }

  /**
   * Setea la direccion
   * @param address 
   */
  public setAddress(address: string){
    this.order.setAddress(address);
    this.saveOrder();
  }

}
