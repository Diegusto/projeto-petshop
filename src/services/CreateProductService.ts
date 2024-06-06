import { ProductsRepository } from "../repositories/productsRepository";

interface Request{
    name: string,
    description:string,
    price:number,
    type:string
}

interface Response {
    id: number,
    name: string,
    description:string,
    price:number,
    type:string
}

class CreateProductService{
    public async execute({
        name,
        description,
        price,
        type
    }: Request): Promise<Response> {
        const productsRepository = new ProductsRepository();
        const product = await productsRepository.create({
            name,
            description,
            price,
            type
        })
        return product
    }
}

export {CreateProductService}