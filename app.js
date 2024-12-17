require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api", weatherRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
      status: 'error',
      message: 'An internal error occurred'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Attempting to start server on port ${PORT}...`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync({ alter: true }); 
    console.log("Database tables created!");

    console.log(`Server successfully started on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
