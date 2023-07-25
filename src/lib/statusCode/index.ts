export interface IStatusCode {
    badRequest: number,
    successful: number,
    notFound: number,
    internalServerError: number
  }
  
  export const statusCode: IStatusCode = {
    badRequest: 400,
    successful: 200,
    notFound: 404,
    internalServerError: 500,
  };
  
  