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