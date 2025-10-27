import app from "./src/app.js";
import connectDb from "./src/config/db.js";
const port = process.env.PORT || 5100;
connectDb();
app.listen(port, () => {
  console.log(`Server Live on http://localhost:${port}`);
});
