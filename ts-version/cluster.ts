import express, { Request, Response, Application } from "express";
import cluster from "cluster";
import os from "os";

if (cluster.isPrimary) {
  const totalCPUs = os.cpus().length;
  console.log(`Number of CPUs is ${totalCPUs}`);
  // console.log(`Master ${process.pid} is running`);
  
  // Fork workers.
  for (let i = 1; i <= totalCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on("exit", (_worker, _code, _signal) => {
    // console.log(`worker ${worker.process.pid} died`);
    // console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app:Application = express();
  // console.log(`Worker ${process.pid} started`);
  
  app.get("/", (_req:Request, res:Response) => {
    res.send("Hello World!");
  });
  
  app.get("/api/:n", function (req:Request, res:Response) {
    let n = parseInt(req.params.n);
    let count = 0;
    
    if (n > 5000000000) n = 5000000000;
    
    for (let i = 1; i <= n; i++) {
      count++;
    }
    
    res.send(`Final count is ${count}`);
  });
  
  const PORT:number = 4000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
