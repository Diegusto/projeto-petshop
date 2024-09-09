import { ProductsRepository } from "../repositories/productsRepository";
import { AppError } from "../error/AppError";

interface Request{
    productId: number,
    price:number
}

interface Response{
    id: number,
    name: string,
    description: string,
    price: number,
    type: string
}

class UpdateProductService{
    public async execute({
        productId,
        price
    }:Request): Promise<Response>{
        const productsRepository = new ProductsRepository();

        console.log("cheguei")
        console.log(productId)
        const findProduct = await productsRepository.FindById(productId);
        if (!findProduct){
            console.log("nãoa chei")
            throw new AppError('product not found')
        }
        console.log("achei")
        const product = await productsRepository.update(productId, price)

        return product
    }

}

export {UpdateProductService}