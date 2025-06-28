import { ICategory } from "./category.model"
import { IProductExtra } from "./product-extra.model"

export interface IProduct {
    _id?: string
    name: string
    img?: string
    price: number
    category: ICategory
    extras: IProductExtra[]
}