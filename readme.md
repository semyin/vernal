# Vavite Vike example with NestJS

Simple example of using [Vike](https://vike.dev/) with Vavite and [NestJS](https://nestjs.com/) that shows how to:

- Integrate NestJS with Vite's dev server
- Run multiple build steps (for client and server)
- Perform React SSR with Vike

Clone with:

```bash
npx degit cyco130/vavite/examples/nestjs-vike
```

### change logs
update vite verison: ^5.4.11 =>  ^6.1.1
update vike version: ^0.4.205 => ^0.4.212
update package script: `"dev": "vite optimize --force && vavite serve"` => `vavite serve`

### docker deploy
Assuming your MySQL is using the `my-network` network
1. Go to the vernal root directory and execute the build command `docker build -t vernal .`
2. After the build is successful, execute `docker run -d --name vernal --network my-network -p 3000:3000 vernal`
