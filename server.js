const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const webAuth = require("./utils/webAuthn");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.use(compression());

app.get('/health', function(req, res){
  res.send(200, 'OK BE');
});

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
}));

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.listen(process.env.PORT || 7000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 7000}`);
});

app.post("/auth/registerRequest", (req, res) => {
  const registered = webAuth.generateRegistration();
  console.log("REGISTERED", registered);
  // res.sendStatus(200);
  return res.send(registered);
});
