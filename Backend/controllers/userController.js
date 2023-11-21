// userController.js
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  // Check if username already exists
  const existingUser = await prisma.users.findUnique({
      where: {
        username: req.body.username,
      },
    });
  
    if (existingUser) {
      // Username already exists; return an error response
      return res.status(400).json({ msg: 'Username already taken' });
    }
  
  // If username does not exist, hash the password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = req.body;
    const user = await prisma.users.create({
      data:{
        username: newUser.username,
        password: hashedPassword,
      },
    });
    res.status(201).json({msg: 'User created successfully'});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    // res.json(users);
    res.status(200).json({msg: 'All users', data: users});
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
            res.status(404).json({ msg: 'User not found' });
        } else {
            res.status(200).json({msg: 'User found', data: response});
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

};

// Function to login a user
export const login = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: req.body.username,
      },
    });

    // If user does not exist, return an error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user exists, compare the password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Password' });
    }
    res.json({ username:user.username,msg: 'Login successful' });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



