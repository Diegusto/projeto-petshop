import { UsersRepository } from '../repositories/usersRepository';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error/AppError';

const usersRepository = new UsersRepository();

async function ensureAdmin(request:Request, response:Response, next:NextFunction) {
    const {id} = request.user;
    const findUser = await usersRepository.FindById(id);
    if (!findUser){
        throw new AppError('user not found', 400);
    }


    if (!findUser.type.includes('admin') && !findUser.type.includes('master')){
        throw new AppError('user not allowed',403);
    }
    
    return next();
}
export {ensureAdmin};