import app from "./app";

// Start server
const port = 9090;
app.listen(port, () => {
  console.log("🚀 Server is up on port", port);
});
