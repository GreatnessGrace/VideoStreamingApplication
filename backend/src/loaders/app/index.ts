import { Server, createServer } from "http";
import express , { Express, Router }from 'express';
import * as process from 'process';
import cors from 'cors';
const PORT = process.env.PORT || 5000;

import { statusCode,IStatusCode } from '../../lib';

const appLoader = (app: Express, router: Router) => new Promise<boolean>(resolve => {
    const server: Server = createServer(app);
    app.use(cors({
      origin: true,
      credentials: true,
    }));
    app.use(express.json({
      limit: "10mb",
    }));
    app.use(express.urlencoded({
      extended: true,
    }));

    app.use("/", router);
    app.use((req, res) => {
        res
          .status((statusCode as IStatusCode).notFound)
          .send({
            success: false,
            data: null,
            message: "the resource you are looking for is not found.",
          });
      });

      server.listen(PORT,()=>{
        console.log(`App is running on ${ PORT }`);
        resolve(true);
      })
    });

      export { appLoader };


