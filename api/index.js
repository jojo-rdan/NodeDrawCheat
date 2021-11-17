const port = 3001;
const app = require('./src/app');

app.listen(port, async () => {
    console.log(`Server running at port ${port}`);
});