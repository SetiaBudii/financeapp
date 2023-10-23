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

  export const deleteOutcome = async (req, res) => {
    try{
        const { id_outcome } = req.params;
        const outcome = await prisma.outcome.delete({
            where: {
                id_outcome: parseInt(id_outcome),
            },
        });

        if (!outcome) {
            res.status(404).json({ msg: 'Outcome not found' });
        } else {
            res.status(200).json({msg: 'Outcome deleted', data: outcome});
        }
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
  
//Mendapat semua outcome perhari
export const getOutcomeByday = async (req, res) => {
    try {
      const { startDate, endDate, username } = req.query;
      const outcomeByWallet = await prisma.outcome.groupBy({
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
      outcomeByWallet.forEach((outcome) => {
        for (let i = 0; i < tipe.length; i++) {
          if (outcome.id_wallet === tipe[i].id_wallet) {
            const modifiedoutcome = {
              date: startDate,
              amount: outcome._sum.amount,
              tipewallet: tipe[i].tipe}
            result.push(modifiedoutcome);
            break;
          }
        }
      });
      res.json(result);
    } catch (error) {
      console.error('Error retrieving outcome in period:', error);
      res.status(500).json({ msg: error.message });
    } finally {
      await prisma.$disconnect();
    }
  };

  export const getTotalOutcomeInPeriod = async (req, res) => {
    try {
      const { startDate, endDate, username } = req.query;
      const incomeInPeriod = await prisma.outcome.findMany({
        where: {
          time_stamp: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          wallet: {
            username: username,
          },
        },select: {
          id_outcome: true,
          amount: true,
          time_stamp: true,
          id_kategori: true,
          wallet: { select: { username: true, tipe: true } },
        },
      });
  
      const incomeByDay = {};
      let currentId = 0;
  
      incomeInPeriod.forEach((outcome) => {
        const dateKey = outcome.time_stamp.toISOString().split('T')[0];
        incomeByDay[dateKey] = incomeByDay[dateKey] || {
          dailyIncome: 0,
          wallet: outcome.wallet,
        };
        incomeByDay[dateKey].dailyIncome += outcome.amount;
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
  
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error('Error retrieving income in period:', error);
      res.status(500).json({ msg: error.message });
    } finally {
      await prisma.$disconnect();
    }
  };

  export const getSumOutcomeByCategory = async (req, res) => {
    try {
      const { id_kategori } = req.params;
  
      const categorySum = await prisma.outcome.aggregate({
        where: {
          id_kategori: parseInt(id_kategori),
        },
        _sum: {
          amount: true,
        },
      });

      res.json({ totalOutcome: categorySum._sum.amount });
    } catch (error) {
      console.error('Error retrieving total outcome by category:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };

  export const getsumalloutcomebycategory = async (req, res) => {
    try {
      const { username } = req.params.username;
      const outcomeByWallet = await prisma.outcome.groupBy({
        by: ['id_kategori'],
        where: {
          wallet: {
            username: username,
          },
        },
        _sum: {
          amount: true,
        },
      });
      const wallet = await prisma.wallet.findMany({
        where: {
          username: req.params.username,
        },
        select: {
          id_wallet: true,
          username: true,
        },
      });

      const nama = await prisma.kategori.findMany({
        where: {
          username: req.params.username,
        },
        select: {
          nama_kategori: true,
          id_kategori: true,
          username: true,
        },
      });

      console.log(nama);

      const result = [];
      let x = 0;
      outcomeByWallet.forEach((outcome) => {
        for (let i = 0; i < nama.length; i++) {
          if ((parseInt(outcome.id_kategori) === parseInt(nama[i].id_kategori))) {
            console.log("masuk");
            const modifiedoutcome = {
              amount: outcome._sum.amount,
              username: nama[i].username,
              nama_kategori: nama[i].nama_kategori}
            result.push(modifiedoutcome);
            break;
          }
        }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error('Error retrieving outcome in period:', error);
      res.status(500).json({ msg: error.message });
    } finally {
      await prisma.$disconnect();
    }
  };