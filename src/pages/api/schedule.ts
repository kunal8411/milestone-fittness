import type { NextApiRequest, NextApiResponse } from 'next';

// Define the response data type
type ClassSchedule = {
  id: number;
  name: string;
  trainer: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  description: string;
};

type ResponseData = {
  success: boolean;
  message?: string;
  schedule?: ClassSchedule[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // This is just a placeholder API route
  // In a real application, this would fetch data from a database
  
  if (req.method === 'GET') {
    // Return mock class schedule data
    const schedule: ClassSchedule[] = [
      {
        id: 1,
        name: 'Morning HIIT',
        trainer: 'John Davis',
        day: 'Monday',
        startTime: '06:00',
        endTime: '07:00',
        level: 'Intermediate',
        description: 'High-intensity interval training to jumpstart your day and metabolism.',
      },
      {
        id: 2,
        name: 'Yoga Flow',
        trainer: 'Sarah Wilson',
        day: 'Monday',
        startTime: '08:00',
        endTime: '09:00',
        level: 'All Levels',
        description: 'A gentle yoga flow to improve flexibility and mental clarity.',
      },
      {
        id: 3,
        name: 'Spin Class',
        trainer: 'Emma Roberts',
        day: 'Monday',
        startTime: '17:30',
        endTime: '18:30',
        level: 'All Levels',
        description: 'High-energy indoor cycling with music to boost your cardio.',
      },
      {
        id: 4,
        name: 'Strength Training',
        trainer: 'Mike Johnson',
        day: 'Tuesday',
        startTime: '07:00',
        endTime: '08:00',
        level: 'Intermediate',
        description: 'Focus on proper form and technique for maximum strength gains.',
      },
      {
        id: 5,
        name: 'Pilates',
        trainer: 'Sarah Wilson',
        day: 'Tuesday',
        startTime: '09:30',
        endTime: '10:30',
        level: 'All Levels',
        description: 'Core-focused exercises to improve posture and overall strength.',
      },
      {
        id: 6,
        name: 'Kickboxing',
        trainer: 'David Kim',
        day: 'Tuesday',
        startTime: '18:00',
        endTime: '19:00',
        level: 'Beginner',
        description: 'Learn basic kickboxing techniques while getting a full-body workout.',
      },
      {
        id: 7,
        name: 'CrossFit',
        trainer: 'John Davis',
        day: 'Wednesday',
        startTime: '06:00',
        endTime: '07:00',
        level: 'Advanced',
        description: 'High-intensity functional movements to push your limits.',
      },
      {
        id: 8,
        name: 'Senior Fitness',
        trainer: 'Lisa Torres',
        day: 'Wednesday',
        startTime: '10:00',
        endTime: '11:00',
        level: 'Beginner',
        description: 'Gentle exercises focused on mobility and strength for seniors.',
      },
      {
        id: 9,
        name: 'Zumba',
        trainer: 'Emma Roberts',
        day: 'Wednesday',
        startTime: '17:00',
        endTime: '18:00',
        level: 'All Levels',
        description: 'Dance-based fitness class that is fun and effective for cardio.',
      },
      {
        id: 10,
        name: 'Functional Training',
        trainer: 'Mike Johnson',
        day: 'Thursday',
        startTime: '07:30',
        endTime: '08:30',
        level: 'Intermediate',
        description: 'Movements that translate to everyday activities for practical strength.',
      },
      {
        id: 11,
        name: 'Yoga Meditation',
        trainer: 'Sarah Wilson',
        day: 'Thursday',
        startTime: '09:00',
        endTime: '10:00',
        level: 'All Levels',
        description: 'Combines yoga poses with meditation for mind and body connection.',
      },
      {
        id: 12,
        name: 'Self-Defense',
        trainer: 'David Kim',
        day: 'Thursday',
        startTime: '18:30',
        endTime: '19:30',
        level: 'Beginner',
        description: 'Learn practical self-defense techniques for real-world situations.',
      },
      {
        id: 13,
        name: 'Boot Camp',
        trainer: 'John Davis',
        day: 'Friday',
        startTime: '06:30',
        endTime: '07:30',
        level: 'Advanced',
        description: 'Military-inspired workout to challenge your strength and endurance.',
      },
      {
        id: 14,
        name: 'Low Impact Cardio',
        trainer: 'Lisa Torres',
        day: 'Friday',
        startTime: '11:00',
        endTime: '12:00',
        level: 'Beginner',
        description: 'Cardio workout that is gentle on the joints but effective for fitness.',
      },
      {
        id: 15,
        name: 'Friday Night Pump',
        trainer: 'Mike Johnson',
        day: 'Friday',
        startTime: '17:30',
        endTime: '18:30',
        level: 'Intermediate',
        description: 'End your week strong with this high-energy strength training session.',
      },
      {
        id: 16,
        name: 'Weekend Warrior',
        trainer: 'Emma Roberts',
        day: 'Saturday',
        startTime: '09:00',
        endTime: '10:00',
        level: 'All Levels',
        description: 'Full body workout to kickstart your weekend with energy.',
      },
      {
        id: 17,
        name: 'Martial Arts Basics',
        trainer: 'David Kim',
        day: 'Saturday',
        startTime: '11:30',
        endTime: '12:30',
        level: 'All Levels',
        description: 'Introduction to martial arts principles and basic techniques.',
      },
      {
        id: 18,
        name: 'Sunday Stretch',
        trainer: 'Sarah Wilson',
        day: 'Sunday',
        startTime: '10:00',
        endTime: '11:00',
        level: 'All Levels',
        description: 'Relaxing stretching session to improve mobility and recover from the week.',
      },
      {
        id: 19,
        name: 'Family Fitness',
        trainer: 'Lisa Torres',
        day: 'Sunday',
        startTime: '12:00',
        endTime: '13:00',
        level: 'All Levels',
        description: 'Fun workout designed for families to exercise together.',
      },
    ];
    
    // Filter by day if provided
    const { day } = req.query;
    if (day && typeof day === 'string') {
      const filteredSchedule = schedule.filter(
        class_ => class_.day.toLowerCase() === day.toLowerCase()
      );
      res.status(200).json({ success: true, schedule: filteredSchedule });
    } else {
      res.status(200).json({ success: true, schedule });
    }
  } else {
    // Method not allowed
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 