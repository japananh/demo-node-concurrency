import express, { Request, Response, Application } from "express";

const app: Application = express();
const PORT:number = 3000;

app.get("/", (_req: Request, res: Response):void => {
  res.send("Hello World!");
});

app.get("/api/:n", function (req: Request, res: Response):void {
  let n = parseInt(req.params.n);
  let count = 0;
  
  if (n > 5000000000) n = 5000000000;
  
  for (let i = 1; i <= n; i++) {
    count++;
  }
  
  res.send(`Final count is ${count}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
