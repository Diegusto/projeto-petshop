import { ProductsRepository } from "../repositories/productsRepository";

interface Request{
    productId: number,
    quantity?: number,
    price?:number
}

interface Response{
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    brand: string
}

class UpdateProductService{
    public async execute({
        productId,
        quantity,
        price
    }:Request): Promise<Response>{
        const productsRepository = new ProductsRepository();

        const findProduct = await productsRepository.FindById(productId);
        if (!findProduct){
            throw new Error('product not found')
        }

        if (!quantity){
            quantity = 0
        }

        const newQuantity = findProduct.quantity + quantity
        const product = await productsRepository.update(productId, newQuantity, price)

        return product
    }

}

export {UpdateProductService}