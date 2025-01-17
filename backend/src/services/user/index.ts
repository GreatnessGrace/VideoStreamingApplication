import { USER } from '../../models';

type T = Awaited<Promise<PromiseLike<object | null>>>

export const updateUser = (search: object, update:object, options?: object) => {
   return new Promise<T>((resolve, reject)=>{
        USER.findOneAndUpdate(search, update, options)
        .select('-password')
        .then(resolve)
        .catch(reject);
    })
};

// export const updateUser = (search: object, update: object, options?: object): Promise<object | null> => {
//     console.log('Updating user:', search, 'with update:', update);
//     return new Promise((resolve, reject) => {
//       USER.findOneAndUpdate(search, update, options)
//         .select('-password')
//         .then((result) => {
//           console.log('Update result:', result);
//           resolve(result);
//         })
//         .catch((error) => {
//           console.error('Update error:', error);
//           reject(error);
//         });
//     });
//   };
  
