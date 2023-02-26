import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from "cors";
import * as child_process from 'child_process'; 


// ----------------------------------------------------
const app: Express  = express();
app.use(cors())
var jsonParser = bodyParser.json()
const PORT = process.env.PORT || 8282;


app.get('/', async (req: Request, res: Response)=>{
   res.status(200);
   res.send("Home get")
});

app.post('/runner', jsonParser, async (req: Request, res: Response)=>{
    const workflowID = req.body.id;
    const workflowJob = req.body.workflow_job;
    const org = req.body.org_name;
    const workflowRepo = req.body.repository;
    //const authToken = req.body.token; //jwt token
    const repoURL = workflowRepo.html_url;

    //const org = repoURL.split("/").slice(-2, -1)[0];
    const repoName = repoURL.split("/").at(-1);
    
    //console.log(authToken, org, repoName);
    //var executeDocker = await child_process.exec('sudo docker run --rm actions-image '+ repoURL + ' ' + org + ' ' + repoName + ' ' + authToken,  
    var executeDocker = await child_process.exec('sudo docker run --rm actions-image '+ repoURL + ' ' + org + ' ' + repoName,  
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
    
    console.log("here");
    });
  
      
app.listen(PORT, () =>{
    console.log("Server is Successfully Running, and App is listening on port "+ PORT)
});

// ----------------------------------------------

