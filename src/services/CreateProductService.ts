import { ProductsRepository } from "../repositories/productsRepository";

interface Request{
    name: string,
    description:string,
    price:number,
    quantity:number,
    brand:string
}

interface Response {
    id: number,
    name: string,
    description:string,
    price:number,
    quantity:number,
    brand:string
}

class CreateProductService{
    public async execute({
        name,
        description,
        price,
        quantity,
        brand
    }: Request): Promise<Response> {
        const productsRepository = new ProductsRepository();
        const product = await productsRepository.create({
            name,
            description,
            price,
            quantity,
            brand
        })
        return product
    }
}

export {CreateProductService}