# Demo Node concurrency

You need Nodejs >=14 to run server.

```bash
yarn # or `npm i` to install dependencies
yarn ts1 # run non-cluster version
yarn ts2 # run cluster version
npx loadtest localhost:[port]/api/:n # run load test
```

# TODO

- [ ] Use `pm2` to manage cluster
- [ ] Write `Go` api version and benchmark it
- [ ] ping server from EC2 AWS
