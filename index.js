const express = require('express');
const secureRouter = require('./routes/secure-pay.routes');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/v1/secure-pay', secureRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});