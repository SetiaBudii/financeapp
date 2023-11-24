import { PrismaClient } from "@prisma/client";
import e, { query } from "express";

const prisma = new PrismaClient();

export const createIncome = async (req, res) => {
    try {
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
    try {
        const response = await prisma.income.findMany();
        res.status(200).json({ msg: 'All incomes', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Mendapat semua income berdasarkan username
export const getIncomeByUser = async (req, res) => {
    const { username } = req.params; // Extract the username from the URL parameter

    try {
        const userIncomes = await prisma.income.findMany({
            where: { wallet: { username } },
            select: {
                id_income: true,
                id_wallet: true,
                amount: true,
                time_stamp: true,
                wallet: { select: { username: true, tipe: true } },
            },
        });

        if (!userIncomes) {
            return res.status(404).json({ error: 'Income not found' });
        } else {
            return res.status(200).json({ msg: 'Income Found', data: userIncomes });
        }
    } catch (error) {
        console.error('Error retrieving user outcomes:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
};

//Mendapat semua income berdasarkan username dan periode (dalam satu hari)
export const getIncomeInPeriod = async (req, res) => {
  try {
    const { startDate, endDate, username } = req.query;
    const incomeByWallet = await prisma.income.groupBy({
      by: ['id_wallet'],
      where: {
        time_stamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        wallet: {
          username: username,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const tipe = await prisma.wallet.findMany({
      where: {
        username: username,
      },
      select: {
        tipe: true,
        id_wallet: true,
      },
    });

    const result = [];
    incomeByWallet.forEach((income) => {
      for (let i = 0; i < tipe.length; i++) {
        if (income.id_wallet === tipe[i].id_wallet) {
          const modifiedIncome = {
            date: startDate,
            amount: income._sum.amount,
            tipewallet: tipe[i].tipe}
          result.push(modifiedIncome);
          break;
        }
      }
    });

    // res.json(result);
    res.status(200).json({ msg: 'Income', data: result });

  } catch (error) {
    console.error('Error retrieving income in period:', error);
    res.status(500).json({ msg: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getTotalIncomeInPeriod = async (req, res) => {
  try {
    const { startDate, endDate, username } = req.query;

    const incomeInPeriod = await prisma.income.findMany({
      where: {
        time_stamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        wallet: {
          username: username,
        },
      },select: {
        id_income: true,
        amount: true,
        time_stamp: true,
        wallet: { select: { username: true, tipe: true } },
      },
    });

    console.log(incomeInPeriod);
    const incomeByDay = {};
    let currentId = 0;

    incomeInPeriod.forEach((income) => {
      const dateKey = income.time_stamp.toISOString().split('T')[0];
      incomeByDay[dateKey] = incomeByDay[dateKey] || {
        dailyIncome: 0,
        wallet: income.wallet,
      };
      incomeByDay[dateKey].dailyIncome += income.amount;
    });

    // Create an array of date-income pairs
    const result = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const dateKey = currentDate.toISOString().split('T')[0];
      const dailyIncomeData = incomeByDay[dateKey] || { dailyIncome: 0, wallet: {tipe: "-"} };
      result.push({
        id_income: currentId++,
        time_stamp: dateKey,
        amount: dailyIncomeData.dailyIncome,
        wallet: dailyIncomeData.wallet,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    res.status(200).json({ msg: 'List Income', data: result });
  } catch (error) {
    console.error('Error retrieving income in period:', error);
    res.status(500).json({ msg: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteIncome = async (req, res) => {
    try {
        const response = await prisma.income.delete({
            where: { id_income: parseInt(req.params.id_income) }
        });
        console.log(req.params.id_income);
        res.status(200).json({ msg: 'Income deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}