import { ProductsRepository } from "../repositories/productsRepository";

interface Request{
    name: string,
    description:string,
    price:number,
    quantity:number
}

interface Response {
    id: number,
    name: string,
    description:string,
    price:number,
    quantity:number
}

class CreateProductService{
    public async execute({
        name,
        description,
        price,
        quantity
    }: Request): Promise<Response> {
        const productsRepository = new ProductsRepository();
        const product = await productsRepository.create({
            name,
            description,
            price,
            quantity
        })
        return product
    }
}

export {CreateProductService}