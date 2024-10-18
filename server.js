const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// Paths to the JSON files
const usersFilePath = "./src/data/users.json";
const walletsFilePath = "./src/data/wallets.json";

// Endpoint to get wallet for a specific user
app.get('/api/wallet/:userId', (req, res) => {
  const { userId } = req.params;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  const wallets = JSON.parse(fs.readFileSync(walletsFilePath, 'utf-8'));

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userWallet = wallets[userId] || [];
  res.json({
    Fname: user.Fname,
    Lname: user.Lname,
    wallet: userWallet
  });
});

// Endpoint to update wallet when a currency is added or updated
app.post('/api/wallet/:userId', (req, res) => {
  const { userId } = req.params;
  const { code, amount } = req.body;

  const wallets = JSON.parse(fs.readFileSync(walletsFilePath, 'utf-8'));
  if (!wallets[userId]) {
    wallets[userId] = [];
  }

  const existingCurrency = wallets[userId].find(c => c.code === code);
  if (existingCurrency) {
    existingCurrency.current_value += amount;
  } else {
    wallets[userId].push({ code, current_value: amount });
  }

  fs.writeFileSync(walletsFilePath, JSON.stringify(wallets, null, 2));
  res.json({ message: 'Wallet updated successfully', wallet: wallets[userId] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
