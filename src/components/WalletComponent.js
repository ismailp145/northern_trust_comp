import React, { useEffect, useState } from 'react';
import users from '../data/users.json';
import wallets from '../data/wallets.json';

const WalletComponent = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Find the user by userId
        const user = users.find(u => u.id === userId);
        if (!user) {
          setError('User not found');
          return;
        }

        // Get the wallet for the userId
        const userWallet = wallets[userId] || [];

        setUserData({
          Fname: user.Fname,
          Lname: user.Lname,
          wallet: userWallet,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.Fname} {userData.Lname}'s Wallet</h1>
      <ul>
        {userData.wallet.map((item, index) => (
          <li key={index}>
            Code: {item.code}, Current Value: {item.current_value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletComponent;
