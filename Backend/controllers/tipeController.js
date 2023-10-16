import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTipe = async (req, res) => {
    try {
      const tipe_wallet = await prisma.tipe_wallet.findMany();
      res.json(tipe_wallet);
    } catch (error) {
      console.error('Error fetching tipe_wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const createTipeWallet = async (req, res) => {
    try {
      const { tipe } = req.body;
  
      // Check if the tipe_wallet with the provided tipe already exists
      const existingTipeWallet = await prisma.tipe_wallet.findUnique({
        where: { tipe },
      });
  
      if (existingTipeWallet) {
        return res.status(400).json({ error: 'tipe_wallet already exists' });
      }
  
      const newTipeWallet = await prisma.tipe_wallet.create({
        data: { tipe },
      });
  
      return res.status(201).json(newTipeWallet);
    } catch (error) {
      console.error('Error creating tipe_wallet:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };