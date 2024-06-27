import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import bodyParser from "body-parser";
import cors from "cors";
import barang from "./routes/barang.routes.js";
import jenisBarang from './routes/jenisBarang.routes.js';
import transaksi from './routes/transaksi.routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/barang', barang);
app.use('/api/v1/jenisBarang', jenisBarang);
app.use('/api/v1/transaksi', transaksi);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
