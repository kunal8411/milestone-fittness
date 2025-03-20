import type { NextApiRequest, NextApiResponse } from 'next';

// Define the response data type
type Trainer = {
  id: number;
  name: string;
  role: string;
  image: string;
  specializations: string[];
  bio: string;
  certifications: string[];
};

type ResponseData = {
  success: boolean;
  message?: string;
  trainers?: Trainer[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // This is just a placeholder API route
  // In a real application, this would fetch data from a database
  
  if (req.method === 'GET') {
    // Return mock trainers data
    const trainers: Trainer[] = [
      {
        id: 1,
        name: "Amit Sharma",
        role: 'Head Fitness Coach',
        image: '/images/trainers/trainer1.jpeg',
        specializations: ['Strength Training', 'HIIT', 'Nutrition'],
        bio: 'John is a certified personal trainer with over 10 years of experience helping clients achieve their fitness goals. His specialty is strength training and high-intensity interval training.',
        certifications: ['NASM Certified Personal Trainer', 'CrossFit Level 2 Trainer', 'Precision Nutrition Certified'],
      },
      {
        id: 2,
        name: "Priya Patel",
        role: 'Yoga & Pilates Instructor',
        image: '/images/trainers/trainer2.jpeg',
        specializations: ['Yoga', 'Pilates', 'Flexibility'],
        bio: 'Sarah brings a holistic approach to fitness with her expertise in yoga and pilates. She focuses on improving flexibility, core strength, and mind-body connection.',
        certifications: ['Yoga Alliance RYT-500', 'Pilates Method Alliance Certified', 'Meditation Coach'],
      },
      {
        id: 3,
        name: "Rajesh Kumari",
        role: 'Sports Performance Coach',
        image: '/images/trainers/trainer3.jpg',
        specializations: ['Sports Performance', 'Functional Training', 'Rehabilitation'],
        bio: 'With a background in sports medicine, Mike specializes in helping athletes improve performance and recover from injuries. His functional training programs are designed for optimal results.',
        certifications: ['NSCA Certified Strength and Conditioning Specialist', 'Athletic Recovery Specialist', 'TRX Suspension Training'],
      },
      {
        id: 4,
        name: "Anjali Verma",
        role: 'Cardio & Weight Loss Specialist',
        image: '/images/trainers/trainer4.jpeg',
        specializations: ['Weight Loss', 'Cardio Training', 'Group Fitness'],
        bio: 'Emma is passionate about helping clients transform their bodies through effective cardio and nutrition strategies. She specializes in sustainable weight loss programs.',
        certifications: ['ACE Certified Personal Trainer', 'Weight Management Specialist', 'Group Fitness Instructor'],
      },
      {
        id: 5,
        name: "Vikram Singh",
        role: 'Martial Arts Instructor',
        image: '/images/trainers/trainer5.jpeg',
        specializations: ['Martial Arts', 'Self-Defense', 'Core Training'],
        bio: 'David brings discipline and focus to his training sessions with a background in various martial arts. His classes combine self-defense techniques with intense core workouts.',
        certifications: ['3rd Degree Black Belt in Taekwondo', 'Kickboxing Instructor', 'Self-Defense Specialist'],
      }
      
    ];
    
    // Filter by specialization if provided
    const { specialization } = req.query;
    if (specialization && typeof specialization === 'string') {
      const filteredTrainers = trainers.filter(trainer => 
        trainer.specializations.includes(specialization)
      );
      res.status(200).json({ success: true, trainers: filteredTrainers });
    } else {
      res.status(200).json({ success: true, trainers });
    }
  } else {
    // Method not allowed
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 