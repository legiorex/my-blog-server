import dotenv from 'dotenv';
import express from 'express';
const app = express();
const port = process.env.PORT;
dotenv.config();
app.get('/', (request, response) => {
    response.send('Hello world!');
});
app.listen(port, () => console.log(`⚡️ Running on port ${port}`));
//# sourceMappingURL=index.js.map