import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Request,Response } from 'express';
import { send } from 'process';
import { unlink } from 'fs';
import fs from "fs";
(async () => {

  // Init the Express application
  const app = express();
  let abs_path:string;
  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get('/filteredimage',async (req: Request, res: Response) => {
    try{
        
   let url:string = req.query.image_url;
   //let value:string = await filterImageFromURL(url);
   //res.status(200).sendFile(value);
   //deleteLocalFiles([value]);
  filterImageFromURL(url).then((value)=> {
    abs_path=value;
    res.status(200).sendFile(value);
    res.on('finish',()=>{
      deleteLocalFiles([abs_path])
    });
  })
  //res.send (url);
  ;
}

catch (e) {
  res.status(500).send("Error");
}
  })
  /**************************************************************************** */
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
/*
 app.get("/letmetest",
    (req,res)  =>  {
      let n = req.query.x;
      res.send("ok"+n);
  })
*/ 
app.all('*', (req:Request , res: Response) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();