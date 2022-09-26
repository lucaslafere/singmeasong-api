## 🏁 Rodando a aplicação

Be sure you are in [Node.js] latest stable version (https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository in your machine:

```
git clone https://github.com/lucaslafere/singmeasong-api
```

## Unit and Integration tests

Run the following command to install the dependencies.

```
npm install
```

Then, after you create the .env file as in .env.example, run the following command to create the database with prisma:

```
npx prisma migrate dev
```

To run unit tests run: 

```
npm run test:unit
```

To run the integration tests, run:

```
npm run test:int
```
