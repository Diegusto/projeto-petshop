import { UsersRepository } from '../repositories/usersRepository';
import { Request, Response, NextFunction } from 'express';

const usersRepository = new UsersRepository();

async function ensureAdmin(request:Request, response:Response, next:NextFunction) {
    const {id} = request.user;
    const findUser = await usersRepository.FindById(id);
    if (!findUser){
        throw new Error('user not found');
    }


    if (!findUser.type.includes('admin') && !findUser.type.includes('master')){
        throw new Error('user not allowed');
    }
    
    return next();
}
export {ensureAdmin};