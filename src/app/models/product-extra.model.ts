import { IProductExtraOption } from "./product-extra-option.model"

export interface IProductExtra {
    name: string
    img: string
    options: IProductExtraOption[]
}