import { makeResponse, statusCode } from "../../../lib";
import { Router, Response, Request } from "express";
import {  getQueryVideos, getRandomVideos, getVideoById, trendingVideos, updateVideo } from "../../../services";
import {  addViewJoi, getTagVideosJoi, getVideoJoi, searchVideosJoi } from "../../../middlewares/joi/videos";


const router = Router();


router
router.get('/trend', async (req: Request, res: Response) => {

    try {
       const videos = await trendingVideos ()
       return makeResponse(req, res, statusCode.successful, true, "Trending videos retreived succesfully", videos);
    } catch (error) {
        const err = error instanceof Error ?  error : {
            message : 'An unknown error occured.'
        }
        makeResponse( req, res, statusCode.badRequest, false, err.message);  
    }
})
.get('/random', async(req: Request, res: Response) => {
    try {

        const videos = await getRandomVideos([{$sample: {size: 40}}])

        makeResponse(req, res, statusCode.successful, true, 'Random videos reterived Successfully',videos)
    } catch (error) {
        const err = error instanceof Error ? error : {
            message: 'An unknownn error occured'
        }
        makeResponse(req, res, statusCode.badRequest,false, err.message );
        
    }
})
.get('/tag', getTagVideosJoi, async(req: Request, res: Response) => {
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
.get('/search', searchVideosJoi, async(req: Request, res: Response) => {
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
      
.put('/views/:id', addViewJoi, async (req: Request, res: Response) => {
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


export const publicVideoController = router;