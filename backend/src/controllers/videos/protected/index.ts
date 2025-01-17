import { IReqUser, makeResponse, statusCode } from "../../../lib";
import { Router, Response, Request } from "express";
import { addVideo, deleteVideo, getUser, getVideo, getVideoById, updateVideo } from "../../../services";
import { addVideoJoi, deleteVideoJoi, subscribedVideoJoi, updateVideoJoi } from "../../../middlewares/joi/videos";
import { Iuser } from '../../../lib/interface/user';
import { IVideo } from "../../../lib/interface/video";


const router = Router();

interface ExtendedRequest extends Request {
    user?: Iuser;
}
router
.post('/', addVideoJoi, async(req: Request, res: Response) => {
    const { userId, title, desc, imgUrl, videoUrl, tags }  = req.body;
try {
    const video = await addVideo({ userId, title, desc, imgUrl, videoUrl, tags });
    makeResponse(req, res, statusCode.successful, true, 'Video Uploaded Successfully', video);
} catch (error) {
    const err = error instanceof Error ?  error : {
        message : 'An unknown error occured.'
    }
    makeResponse( req, res, statusCode.badRequest, false, err.message);
}})
.put('/:id',updateVideoJoi, async (req:ExtendedRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        const videoId = req.params.id;
        const video = await getVideoById({_id: videoId},{})
        if (video === null ){
            return makeResponse(req, res, statusCode.badRequest, true, 'Invalid _id, Video not found')
          }
          const videoUserId = (video as IVideo).userId;

        if( userId && userId.toString() === videoUserId)
        {
        const updatedVideo = await updateVideo({_id:videoId },
            {$set: req.body}, 
            {new: true}
            );
return makeResponse(req, res, statusCode.successful, true, 'Video Updated Successfully',updatedVideo)  
}
else{
    return makeResponse(req, res, statusCode.badRequest, false, 'You can update only your video!')  
}        
        }
           catch (error) {
            const err = error instanceof Error ?  error : {
                message : 'An unknown error occured.'
            }
            makeResponse( req, res, statusCode.badRequest, false, err.message);
    }
})

.delete('/:id', deleteVideoJoi, async (req:ExtendedRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        const videoId = req.params.id;
        const video = await getVideoById({_id: videoId},{})
        if (video === null ){
            return makeResponse(req, res, statusCode.badRequest, true, 'Invalid _id, Video not found')
          }
          const videoUserId = (video as IVideo).userId;
        if( userId && userId.toString() === videoUserId)
        {
         await deleteVideo({_id:videoId }
            );
return makeResponse(req, res, statusCode.successful, true, 'Video Deleted Successfully')  
}
else{
    return makeResponse(req, res, statusCode.badRequest, false, 'You can delete only your video!')  
}        
        }
           catch (error) {
            const err = error instanceof Error ?  error : {
                message : 'An unknown error occured.'
            }
            makeResponse( req, res, statusCode.badRequest, false, err.message);
    }
})
.get('/subscribers/:id',subscribedVideoJoi, async (req: Request ,res: Response ) => {
    try {
      const user =  await getUser({_id:req.params.id, status: { $ne: 'DELETED' }}, {password: 0,});
      
      if (!user) {
        return makeResponse(req, res, statusCode.badRequest, false, 'User not found');
    }
      const subscribedChannels: any = (user as IReqUser).user.subscribedUsers ;
  if(subscribedChannels != null ){
    const list = await Promise.all(

        subscribedChannels.map(async (channelId: string) => {
            const videos = await getVideo({userId: channelId}, {});
             return videos
        })
      )
      const flattenedList = list.flat();
      const sortedList = flattenedList.sort((a: { createdAt: number; }, b: { createdAt: number; }) => b.createdAt - a.createdAt);
      return makeResponse(req, res, statusCode.successful, true, 'Succesfully retreived Videos of subscribed users ', sortedList)
  }
      
    } catch (error) {
      const err = error instanceof Error ? error : {message: 'An unknowen erro occured.'};
      makeResponse(req, res, statusCode.badRequest, false, err.message);
    }
  })
  export const protectedVideoController = router;
