import { USER } from '../../models';

type T = Awaited<Promise<PromiseLike<object>>>
type T2 = Awaited<Promise<PromiseLike<object | null>>>
export const createUser = (data: object) => new Promise<T>((resolve,reject) => {
    USER.create(data)
    .then(resolve)
    .catch(reject);
})

export const getUser = (search: object, projection: object) => new Promise<T2>((resolve, reject) => {
    USER.findOne(search, projection)
    .then(resolve)
    .catch(reject);
})