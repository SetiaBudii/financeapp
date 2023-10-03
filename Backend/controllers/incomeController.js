import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createIncome = async (req, res) => {
    try{
        const response = await prisma.income.create({
            data: {
                amount: req.body.amount,
                time_stamp: req.body.time_stamp,
                id_wallet: req.body.id_wallet,
            },
        });
        res.status(201).json({ msg: 'Income created successfully', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllIcnome = async (req, res) => {
    try{
        const response = await prisma.income.findMany();
        res.status(200).json({ msg: 'All incomes', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getIncomeByUser = async (req, res) => {
    try{
        const response = await prisma.income.findMany({
            where: {
                id_wallet: parseInt(req.params.id_wallet),
            },
        });
        if (!response) {
            res.status(404).json({ msg: 'Income not found' });
        } else {
            res.status(200).json({msg: 'Income found', data: response});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}