import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      email, 
      password, 
      role = 'customer',
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      preferences
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Create new user with profile data
    const user = await User.create({
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address: address || {},
      preferences: preferences || {
        newsletter: true,
        smsNotifications: false,
        emailNotifications: true,
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email (exact first)
    let user = await User.findOne({ where: { email } });
    if (!user) {
      // Fallback: case-insensitive match for legacy records
      const { Op, fn, col, where } = require('sequelize');
      user = await User.findOne({
        where: where(fn('LOWER', col('email')), email.toLowerCase())
      });
    }
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Validate password
    let isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      // Compatibility: if stored password is plaintext (legacy), upgrade it
      if (user.password === password) {
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);
        user.password = hashed;
        await user.save();
        isValidPassword = true;
      }
    }

    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: req.user.toJSON()
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      preferences
    } = req.body;

    // Update user profile
    await req.user.update({
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      preferences
    });

    // Reload user to get updated data
    await req.user.reload();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: req.user.toJSON()
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
