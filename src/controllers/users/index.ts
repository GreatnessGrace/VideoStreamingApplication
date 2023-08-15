import { Router, Response , Request } from 'express';
import { makeResponse, statusCode } from '../../lib';
import { updateUserJoi, deleteUserJoi, getUserJoi, subscribeUserJoi, unsubscribptionJoi } from '../../middlewares';
import { updateUser, getUser  } from '../../services'
import { Iuser } from '../../lib/interface/user';
const router = Router();

router
.put('/', updateUserJoi, async (req: Request, res:Response) =>{
    try{
      const user = await getUser({email: req.body.email, _id: {$ne: req.body._id}, status:{ $ne: 'DELETED'}},{});
      if (user !==null ){
        return makeResponse(req, res , statusCode.unauthorized, false, 'This email is already exists',undefined);
      }

      const result = await updateUser({ _id:req.body._id, status: {
        $ne: 'DELETED'
      }}, req.body, 
        { new: true }
      );
      if (result === null ){
        return makeResponse(req, res, statusCode.badRequest, true, 'Invalid _id or Deleted')
      }
      return makeResponse(req, res, statusCode.successful, true, 'Updated Successfully', result);
    }
    catch(error){
        const err = error instanceof Error ? error : { message: 'An unknown error occured.' };
        return makeResponse(req, res, statusCode.badRequest, false, err.message);
    }
})

.delete('/', deleteUserJoi, async (req: Request, res: Response) => {
  try {
    const result = await updateUser({
      _id: req.body._id, status: { $ne: 'DELETED' },
    },{ status: 'DELETED' },
    { new: true});
    return makeResponse(req, res , statusCode.successful, true, 'DELETED Successfully', result)
  } catch (error) {
    const err = error instanceof Error ? error : {message: 'An unknowen erro occured.'};
    makeResponse(req, res, statusCode.badRequest, false, err.message);
  }
})
.get('/', getUserJoi, async (req: Request, res: Response) => {
  try {
    const result =  await getUser({_id:req.body._id, status: { $ne: 'DELETED' }}, {password: 0,});
    return makeResponse(req, res, statusCode.successful, true, "Get Succesfully", result);
  } catch (error) {
    const err = error instanceof Error ? error : {message: 'An unknowen erro occured.'};
    makeResponse(req, res, statusCode.badRequest, false, err.message);
  }
})

.put('/subscribe/:id',subscribeUserJoi, async (req: Request, res: Response) => {
  try {
    const userIdToUpdate = req.body._id; 
    const userIdToSubscribe = req.params.id;   
    const updateResult = await updateUser(
      { _id: userIdToUpdate, status: { $ne: 'DELETED' } },
      { $push: { subscribedUsers: userIdToSubscribe }, $inc: { subscribers: 1 } },
      { new: true }
    );

    return makeResponse(
      req,
      res,
      statusCode.successful,
      true,
      'Subscription Successfull',
      updateResult
    );
  } catch (error) {
    const err = error instanceof Error ? error : {
      message: 'An unknown error occurred'
    };
    makeResponse(req, res, statusCode.badRequest, false, err.message);
  }
})

.put('/unsubscribe/:id',unsubscribptionJoi, async (req: Request, res: Response) => {
  try {
    const userIdToUpdate = req.body._id; 
    const subscribedUserId = req.params.id;   
    const updateResult = await updateUser(
      { _id: userIdToUpdate, status: { $ne: 'DELETED' } },
      { $pull: { subscribedUsers: subscribedUserId }, $inc: { subscribers: -1 } },
      { new: true }
    );

    return makeResponse(
      req,
      res,
      statusCode.successful,
      true,
      'Unsubscription Successfull',
      updateResult
    );
  } catch (error) {
    const err = error instanceof Error ? error : {
      message: 'An unknown error occurred'
    };
    makeResponse(req, res, statusCode.badRequest, false, err.message);
  }
})

// .put('/like', async(req: Request, res: Response) =>{
//   try {
//     const updateResult = async updateUser({
//       {$addToSet :  {likes:id},}
//     })
//   } catch (error: any) {
//     // const err = error instanceof Error ? error : {
//     //   message: 'An unknown error occurred'
//     // };
//     makeResponse(req, res, statusCode.badRequest, false, error);
//   }
// })
//   like, dislike,

export const userRouter = router;