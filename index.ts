import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import * as child_process from 'child_process'; 


// ----------------------------------------------------
const app: Express  = express();
app.use(cors())
const PORT = process.env.PORT || 8282;


app.get('/', async (req: Request, res: Response)=>{
   res.status(200);
   res.send("Home get")
});

app.post('/addrunner', async (req: Request, res: Response)=>{
    const workflowID = req.body.id;
    const workflowJob = req.body.workflow_job;
    const orgName = req.body.org_name;
    const workflowRepo = req.body.repository;
    const repoURL = workflowRepo.html_url;
    const token = req.body.token;

    // run the docker image 

    // execute config
    // fetch token from github app
    var executeConfig = await child_process.exec('./config.sh --url '+ repoURL +' --token AHUOPPLJLPVE3VNDXCCLGS3D5EU6S', (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          res.status(200);
          res.send({"msg":"Config setup failed", "err":err});
        } else {
          res.status(200);
          res.send("Config setup success")
        }
      });


    /*
    var execute = await child_process.exec('curl -s https://raw.githubusercontent.com/actions/runner/main/scripts/create-latest-svc.sh | bash -s'
                                          + orgName+ '/'+workflowRepo.name, 
                                        (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          res.status(200);
          res.send({"msg":"System Service setup failed", "err":err});
        } else {
          console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
          console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
          res.status(200);
          res.send("System Service setup done")
        }
      });

    // execute shell script
    var execute = await child_process.exec('curl -s https://raw.githubusercontent.com/actions/runner/main/scripts/create-latest-svc.sh | bash -s'
                                          + orgName+ '/'+workflowRepo.name, 
                                        (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          res.status(200);
          res.send({"msg":"System Service setup failed", "err":err});
        } else {
          console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
          console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
          res.status(200);
          res.send("System Service setup done")
        }
      });
    */
  
      
  app.post("/deletrunner", async (req:Request, res: Response)=> {
    var execute = await child_process.exec('curl -s https://raw.githubusercontent.com/actions/runner/main/scripts/remove-svc.sh | bash -s'
                                          + orgName+ '/'+workflowRepo.name, 
                                          (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          res.status(200);
          res.send({"msg":"System Service setup failed", "err":err});
        } else {
          console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
          console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
          res.status(200);
          res.send("System Service setup done")
        }
      });
  })
    
 });

app.listen(PORT, () =>{
    console.log("Server is Successfully Running, and App is listening on port "+ PORT)
});

// ----------------------------------------------

