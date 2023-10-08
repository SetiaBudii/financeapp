import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOutcome = async (req, res) => {
    try{
        const response = await prisma.outcome.create({
            data: {
                amount: req.body.amount,
                time_stamp: req.body.time_stamp,
                id_wallet: req.body.id_wallet,
                id_kategori: req.body.id_kategori,
            },
        });
        res.status(201).json({ msg: 'Outcome created successfully', data: response });
    }catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllOutcome = async (req, res) => {
    try{
        const response = await prisma.outcome.findMany();
        res.status(200).json({ msg: 'All outcomes', data: response });
    }catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getOutcomeByUser = async (req, res) => {
    try{
        const response = await prisma.outcome.findMany({
            include: {
                wallet: true,
                kategori: true,
              },
            where: {
                id_wallet: parseInt(req.params.id_wallet),
            }
        });
        if (!response) {
            res.status(404).json({ msg: 'Outcome not found' });
        } else {
            res.status(200).json({msg: 'Outcome found', data: response});
        }
    }catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getOutcomeByCategory = async (req, res) => {
    try{
        const response = await prisma.outcome.findMany({
            where: {
                id_kategori: parseInt(req.params.id_kategori),
            },
        });
        if (!response) {
            res.status(404).json({ msg: 'Outcome not found' });
        } else {
            res.status(200).json({msg: 'Outcome found', data: response});
        }
    }catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserOutcomes = async (req, res) => {
    const { username } = req.params; // Extract the username from the URL parameter
  
    try {
      const userOutcomes = await prisma.outcome.findMany({
        where: { wallet: { username } },
        select: {
          id_outcome: true,
          id_wallet: true,
          id_kategori: true,
          amount : true,
          time_stamp: true,
          wallet: { select: { username: true, tipe: true } },
          kategori: { select: { nama_kategori: true } },
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
  