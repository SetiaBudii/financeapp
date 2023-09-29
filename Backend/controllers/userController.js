// userController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await prisma.users.create({
      data:{
        username: newUser.username,
        password: newUser.password
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

export const getUserByUsername = async (req, res) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                username: req.params.username,
            },
        });
        if (!response) {
            res.status(404).json({ username:req.params.username, msg: 'Not found' });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteUserByUsername = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: req.params.username,
      },
    });
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
    } else {
      await prisma.users.delete({
        where: {
          username: req.params.username,
        },
      });
      res.status(200).json({ msg: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

// Function to update the username of a user by ID
export const updatePasswordByUsername = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: req.params.username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.users.update({
      where: {
        username: req.params.username,
      },
      data: {
        password: req.body.password,
      },
    });

    res.json(updatedUser);
  }
  catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // try {
  //   const user = await prisma.users.findUnique({
  //     where: {
  //       username: req.params.username,
  //     },
  //   });

  //   if (!user) {
  //     return res.status(404).json({ error: 'User not found' });
  //   }

  //   const updatedUser = await prisma.users.update({
  //     where: {
  //       username: username,
  //     },
  //     data: {
  //       username: newUsername.username,
  //       password: newUsername.password,
  //     },
  //   });

  //   res.json(updatedUser);
  // } catch (error) {
  //   console.error('Error updating username:', error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
};
