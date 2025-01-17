import { VIDEO } from "../../models/video";

type T = Awaited<Promise<PromiseLike<object>>>
type T2 = Awaited<Promise<PromiseLike<object | null>>>
type T3 = Awaited<Promise<PromiseLike<Array<object> | null>>>

export const addVideo = (data: object) =>{
    return new Promise<T>((resolve, reject) => {
        VIDEO.create(data)
        .then(resolve)
        .catch(reject);
    })
}

export const getVideoById = (search: object, projection:object, options?: object) => {
    return new Promise<T2>((resolve, reject) => {
        VIDEO.findById(search, projection)
        .then(resolve)
        .catch(reject)
    })
}
export const getVideo = (search: object, projection:object, options?: object) => {
    return new Promise<T2>((resolve, reject) => {
        VIDEO.find(search, projection)
        .then(resolve)
        .catch(reject)
    })
}

export const updateVideo = (search: object, update:object, options?: object) => {
    return new Promise<T2>((resolve, reject)=>{
         VIDEO.findOneAndUpdate(search, update, options)
        .then(resolve)
         .catch(reject);
     })
 };

export const deleteVideo = (search: object) => {
    return new Promise<T2>((resolve, reject)=>{
         VIDEO.findOneAndDelete(search)
        .then(resolve)
         .catch(reject);
     })
 };

 export const trendingVideos = () => {
    return new Promise<T2>((resolve, reject) => {
        VIDEO.find()
        .sort({views: -1})
        .then(resolve)
        .catch(reject)
    })
 }

 export const getRandomVideos = (pipeline:any) => {
    return new Promise<T2>((resolve,reject)=> {
        VIDEO.aggregate(pipeline)
        .then(resolve)
        .catch(reject)
    })
 }
 export const getQueryVideos = (query:object) => {
    return new Promise<T3>((resolve,reject)=> {
        VIDEO.find(query)
        .limit(40)
        .then(resolve)
        .catch(reject)
    })
 }