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

export const getIDWalletByUnameTipe = async (req, res) => {
  try{
    const wallet = req.body;
    const response = await prisma.wallet.findMany({
      where: {
        tipe: wallet.tipe_wallet,
        username: wallet.username,
      },
    });
    console.log(wallet);
    if (!response) {
      res.status(404).json({ msg: 'Wallet not found' });
    } else {
      res.status(200).json({msg: 'Wallet found', data: response});
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
