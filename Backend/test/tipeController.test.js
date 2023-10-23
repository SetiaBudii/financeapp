// tipeController.test.js
import { PrismaClient } from '@prisma/client';
import { getTipe } from '../controllers/tipeController'; // Import the getTipe function

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    tipe_wallet: {
      findMany: jest.fn(),
    },
  })),
}));

const prisma = new PrismaClient();

describe('Tipe Controller Tests', () => {

  it('should get tipe_wallet', async () => {
    // Mock the Prisma query function to return a predefined result
    prisma.tipe_wallet.findMany.mockResolvedValue([{ id: 1, tipe: 'Personal' }]);

    const req = {}; // Your request object (can be empty for this test)
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getTipe(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, tipe: 'Personal' }]);
  });

it('should handle an error when fetching tipe_wallet', async () => {
  // Mock Prisma to throw an error
  prisma.tipe_wallet.findMany.mockRejectedValue(new Error('Database error'));

  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  };

  await getTipe(req, res);

  expect(res.status).toHaveBeenCalledWith(500); // This line is causing the error
  expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
});

});
