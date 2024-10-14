import { FinancesRepository } from "../repositories/financesRepository";

interface Request{
    Value: number,
    date: Date
    description: string
}

interface Response {
    id: number,
    Value: number,
    date: Date,
    description: string
}

class CreateFinancesService{
    public async execute({
        Value,
        date,
        description
    }: Request): Promise<Response> {
        const financesRepository = new FinancesRepository();
        const finance = await financesRepository.create({
            Value,
            date,
            description
        })
        return finance
    }
}

export {CreateFinancesService}