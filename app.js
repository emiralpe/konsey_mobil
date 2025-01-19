const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const interests = require("./routes/interests");
const clubs = require("./routes/clubs");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/interests", interests);
app.use("/api/clubs", clubs);
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // OpenAPI sürümünü belirleyin
      info: {
        title: 'Konsey API', // API başlığı
        version: '1.0.0',
        description: 'Konsey API Swagger Dokümantasyonu',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', // veya Token formatı
          },
        },
      },
      security: [
        {
          bearerAuth: [], // Varsayılan olarak tüm endpointlerde kullanılabilir.
        },
      ],
    },
    apis: ['./routes/*.js'], // Swagger açıklamalarını içeren dosyaların yolu
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI;
(async () => {
    try {
        await mongoose.connect(dbUri);
        console.log("MongoDB'ye bağlanıldı.");
    } catch (error) {
        console.log("MongoDB'ye bağlanırken hata oluştu." + error);
    }
})();


app.get("/", (req, res) => {
    res.send("Konsey API'ye Hoş Geldiniz!");
});


app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
});

