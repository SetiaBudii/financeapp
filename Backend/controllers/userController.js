// userController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to create a new user
export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.users.create({
      data: {
        username,
        password,
      },
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to fetch a single user by ID
export const getUserById = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await prisma.users.findUnique({
        where: {
            username: username,
        },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getProductByUsername = async (req, res) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                username: req.params.username, // Use 'username' as the property name
            },
        });
        if (!response) {
            res.status(404).json({ msg: 'Product not found' });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
