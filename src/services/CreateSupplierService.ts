import { SuppliersRepository } from "../repositories/suppliersRepository"

interface Request{
    productId: number,
    name: string,
    phone: string
}

interface Response {
    id: number,
    productId: number,
    name: string
    phone: string
}

class CreateSupplierService{
    public async execute({
        productId,
        name,
        phone
    }: Request): Promise<Response> {
        const suppliersRepository = new SuppliersRepository();
        const supplier = await suppliersRepository.create({
            productId,
            name,
            phone
        })
        return supplier
    }
}

export {CreateSupplierService}