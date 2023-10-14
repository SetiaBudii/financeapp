import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createWallet = async (req, res) => {
  try {
    // Extract data from the request body
    const walletData = req.body;

    const user = await prisma.users.findUnique({
      where: { username: walletData.username },
    });

    const tipeWallet = await prisma.tipe_wallet.findUnique({
      where: { tipe: walletData.tipe_wallet },
    });

    if (!user || !tipeWallet) {
      // Handle cases where the referenced records don't exist
      return res.status(404).json({ error: 'User or TipeWallet not found' });
    }

    // Check if a wallet already exists with the same username and tipe
    const existingWallet = await prisma.wallet.findFirst({
      where: {
        AND: [
          { users: { username: user.username } },
          { tipe_wallet: { tipe: tipeWallet.tipe } },
        ],
      },
    });

    if (existingWallet) {
      return res.status(400).json({ error: 'Wallet already exists for this user and tipe' });
    }
    

    const newWallet = await prisma.wallet.create({
      data: {
        users: { connect: { username: user.username } }, // Use the ID of the user
        saldo: walletData.saldo,
        tipe_wallet: { connect: { tipe: tipeWallet.tipe } }, // Use the ID of the TipeWallet
      },
    });

    // Respond with the created wallet object
    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWalletbyUsernamed = async (req, res) => {
  try{
      const response = await prisma.wallet.findMany({
          where: {
              username: req.params.username,
          },
      });
      if (!response) {
          res.status(404).json({ msg: 'Wallet not found' });
      } else {
          res.status(200).json({msg: 'Wallet found', data: response});
      }
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}

export const getWalletbyUsername = async (req, res) => {
  const { usernameL } = req.params; // Extract the username from the URL parameter

  try {
    const userOutcomes = await prisma.wallet.findMany({
      where: { username:  req.params.username  },
      select: {
        username: true,
        saldo: true,
        id_wallet: true,
        tipe : true,
      },
    });

    res.json(userOutcomes);
  } catch (error) {
    console.error('Error retrieving user outcomes:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteWallet = async (req, res) => {
  try {
    const { username, tipe } = req.params;

    // Find the wallet with the provided username and tipe
    const wallet = await prisma.wallet.findFirst({
      where: {
        username: username,
        tipe: tipe,
      },
    });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Delete the wallet
    await prisma.wallet.delete({
      where: {
        id_wallet: wallet.id_wallet,
      },
    });

    res.status(204).send(); // Respond with no content (success)
  } catch (error) {
    console.error('Error deleting wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
