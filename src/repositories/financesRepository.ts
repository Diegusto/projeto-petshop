import { finances, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IFinances{
    Value: number,
    date: Date,
    description: string
}

class FinancesRepository{
    public async create({
        Value,
        date,
        description

    }:IFinances): Promise<finances>{
        const finances = await prisma.finances.create({
            data:{
                Value,
                date,
                description
            }
        })
        return finances
    }

    public async listByDate(date1:Date, date2:Date): Promise<finances[]>{
        const finances = await prisma.finances.findMany({
            where:{
                date:{
                    gte: date1,
                    lte: date2
                }
            }
        })
        return finances
    }



}

export {FinancesRepository}