import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;
const port = 4000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  // console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, _code, _signal) => {
    // console.log(`worker ${worker.process.pid} died`);
    // console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  // console.log(`Worker ${process.pid} started`);

  app.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 1; i <= n; i++) {
      count++;
    }

    res.send(`Final count is ${count}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
