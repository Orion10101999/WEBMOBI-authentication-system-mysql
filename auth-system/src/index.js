const express = require('express');
const sequelize = require('./config/database.js');
const authRoutes = require('./routes/authRoutes.js');
require('dotenv').config();

const cors = require('cors');
const app = express();

// Use the CORS middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
