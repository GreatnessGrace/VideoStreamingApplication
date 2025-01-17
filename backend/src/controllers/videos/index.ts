import { IReqUser, makeResponse, statusCode } from "../../lib";
import { Router, Response, Request } from "express";
import { addVideo, deleteVideo, getQueryVideos, getRandomVideos, getUser, getVideo, getVideoById, trendingVideos, updateVideo } from "../../services";
import { addVideoJoi } from "../../middlewares/joi/videos";
import { Iuser } from '../../lib/interface/user';
import { IVideo } from "../../lib/interface/video";


const router = Router();
const route = Router();

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
.put('/:id', async (req:ExtendedRequest, res: Response) => {
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

.delete('/:id', async (req:ExtendedRequest, res: Response) => {
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
        const updatedVideo = await deleteVideo({_id:videoId }
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
.get('/subscribers/:id', async (req: Request ,res: Response ) => {
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
  .get('/trend', async (req: Request, res: Response) => {

    try {

       const videos = await trendingVideos ()
       return makeResponse(req, res, statusCode.successful, true, "Trending videos retreived succesfully", videos);
    } catch (error) {
        const err = error instanceof Error ?  error : {
            message : 'An unknown error occured.'
        }
        makeResponse( req, res, statusCode.badRequest, false, err.message);  
    }
}).get('/random', async(req: Request, res: Response) => {
    try {

        const videos = await getRandomVideos({$sample: {size: 40}})

        makeResponse(req, res, statusCode.successful, true, 'Random videos reterived Successfully',videos)
    } catch (error) {
        const err = error instanceof Error ? error : {
            message: 'An unknownn error occured'
        }
        makeResponse(req, res, statusCode.badRequest,false, err.message );
        
    }
})
.get('/tag', async(req: Request, res: Response) => {
    try {
        
        const tagsParam: string   = req.query.tags as string ;
        const tags = tagsParam.split(",")
        const videos:Array<object> |null = await getQueryVideos({tags:{$in :tags} })
        if(videos!=null && videos.length === 0 ){
            return makeResponse(req, res, statusCode.badRequest, false, 'Please try with different tags');
        }
        return makeResponse(req, res, statusCode.successful, true, 'Succesfully retreived Videos based on tags', videos);
    } catch (error) {
        const err = error instanceof Error ?  error : {
            message : 'An unknown error occured.'
        }
        makeResponse( req, res, statusCode.badRequest, false, err.message);
    }
})
// .get('/search', async(req: Request, res: Response) => {
//     try {
//         const query: string = req.query.q as string;
//         const videos = await getQueryVideos({title:{$regex :query}, $options:"i" })
//         return makeResponse(req, res, statusCode.successful, true, 'Succesfully retreived Videos based on tags', videos);
//     } catch (error) {
//         const err = error instanceof Error ?  error : {
//             message : 'An unknown error occured.'
//         }
//         makeResponse( req, res, statusCode.badRequest, false, err.message);
//     }
// })

// {
//     "success": false,
//     "message": "unknown top level operator: $options. If you have a field name that starts with a '$' symbol, consider using $getField or $setField.",
//     "meta": ""
// }
.get('/search', async(req: Request, res: Response) => {
    try {
        const query : string = req.query.q as string;
        const videos :Array<object> |null = await getQueryVideos({title:{$regex :query, $options:"i"} })
        if(videos!=null && videos.length === 0 ){
            return makeResponse(req, res, statusCode.badRequest, false, 'Please try with different tags');
        }
        return makeResponse(req, res, statusCode.successful, true, 'Succesfully retreived Videos based on Search', videos);
    } catch (error) {
        const err = error instanceof Error ?  error : {
            message : 'An unknown error occured.'
        }
        makeResponse( req, res, statusCode.badRequest, false, err.message);
    }
})


route
.get('/:id', async (req: Request, res: Response)=>{
    try {
        const videoID = req.params.id
        const video = await getVideoById( { _id:videoID } , {});
        return makeResponse(req, res, statusCode.successful, true, "Video retreived succesfully", video);
    } catch (error) {
        const err = error instanceof Error ?  error : {
            message : 'An unknown error occured.'
        }
        makeResponse( req, res, statusCode.badRequest, false, err.message);
    }}) 
      
.put('/views/:id', async (req: Request, res: Response) => {
    try {
        const videoID = req.params.id
        const video = await updateVideo( { _id:videoID } , 
            {
        $inc: {views: 1},
        },{new: true});
        return makeResponse(req, res, statusCode.successful, true, 'Succesfully retreived Videos of subscribed users ', video)

    } catch (error) {
        const err = error instanceof Error ?  error : {
            message : 'An unknown error occured.'
        }
        makeResponse( req, res, statusCode.badRequest, false, err.message);
    }
})

 //   search   
export const videosController = router;
export const videosControlle = route;
