import app from "./app.js";
import { connnectDB } from "./db.js";



connnectDB();
app.listen(4000);
console.log('Server on port', 4000)