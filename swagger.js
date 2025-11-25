const swaggerAutogen = require("swagger-autogen");
const swagger = swaggerAutogen({ openapi: "3.0.0" });
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const app = express();
const outputFile = ("./swagger-output.json");

app.use(bodyParser.json());
let swaggerFile;
try{
    swaggerFile = require(outputFile)
}catch (error){
    swaggerFile= {}
}
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000, () => {
  console.log("API documentation: http://localhost:3000/docs");
});

app.use("/", require("./routes/apiRoutes"));

const doc = {
  info: {
    version: "1.0.0",
    title: "API Reserva salas de reunião",
    description: "API para trabalho academico.",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      someBody: {
        $name: "Jhon Doe",
        $cpf: "12345678900",
        $password: "123456",
        about: "",
      },
      someResponse: {
        name: "Jhon Doe",
        cpf: "12345678900",
      },
      someEnum: {
        "@enum": ["red", "yellow", "green"],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const routes = ["./routes/apiRoutes.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require("./server.js")
});
