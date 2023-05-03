import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from "cors";
import * as child_process from 'child_process'; 
import axios from 'axios';
import {authenticateToken} from "./middleware/authenticateToken";

// ----------------------------------------------------
const app: Express  = express();
app.use(cors())
var jsonParser = bodyParser.json()
const PORT = process.env.PORT || 8282;
const REACT_APP_SERVICE_DB=process.env.REACT_APP_SERVICE_DB || "https://db-dev.classee.cloud"
const REACT_APP_SERVICE_GITHUB=process.env.REACT_APP_SERVICE_GITHUB || "https://gh-dev.classee.cloud"
dotenv.config();

// GET / end point - returns home page
app.get('/', async (req: Request, res: Response)=>{
  res.status(200);
  res.send("Home get")
});


// POST - /runner - end point creates docker container and runs the configured code form the github repo.
app.post('/runner', jsonParser, async (req: Request, res: Response)=>{ 
   const workflowID = req.body.id;
   const workflowJob = req.body.workflow_job;
   const org = req.body.org_name;
   const workflowRepo = req.body.repository;
   const repoURL = workflowRepo.html_url;
   const repoName = repoURL.split("/").at(-1);

   const accessToken = req.body.authorization;
   //console.log(accessToken);

   // get the token from github service. This toke is used to allocate a VM as a self hosted runner for github to recognize
   const response = await axios.get(REACT_APP_SERVICE_GITHUB + `/runnertoken/${org}/${repoName}/${accessToken}`)
   const token = response.data.token;

   if (token!=null){
     //console.log(authToken, org, repoName);
     //var executeDocker = await child_process.exec('sudo docker run --rm actions-image '+ repoURL + ' ' + org + ' ' + repoName + ' ' + authToken,  
     var executeDocker = await child_process.exec('sudo docker run --rm actions-image '+ repoURL + ' ' + token,  
     (err, stdout, stderr) => {
       if (err) {
         console.error(err)
         res.status(200);
         res.send({"msg":"Config setup failed", "err":err});
       } else {
         res.status(200);
         res.send("Config setup success")
       }
     });
   }
   else{
     res.status(500);
     res.send({"msg":"Invalid token from Github Service"});
   }
   });
 
     
app.listen(PORT, () =>{
   console.log("Server is Successfully Running, and App is listening on port "+ PORT)
});

// ----------------------------------------------