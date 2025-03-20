import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Days of the week for filter tabs
const days = [
  'All',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

// Mock class schedule data (in a real app, this would come from an API)
const classes = [
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

// Color mapping for different class levels
const levelColors = {
  'Beginner': 'bg-green-100 border-green-300 text-green-800',
  'Intermediate': 'bg-yellow-100 border-yellow-300 text-yellow-800',
  'Advanced': 'bg-red-100 border-red-300 text-red-800',
  'All Levels': 'bg-blue-100 border-blue-300 text-blue-800',
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('All');

  // Filter classes based on selected day
  const filteredClasses = selectedDay === 'All'
    ? classes
    : classes.filter(c => c.day === selectedDay);

  return (
    <>
      <Head>
        <title>Class Schedule - FITNESS HUB</title>
        <meta name="description" content="View our weekly class schedule and find the perfect fitness classes for your routine." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Header */}
        <div className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Class Schedule</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Find the perfect class to fit your schedule and fitness goals.
            </p>
          </div>
        </div>

        {/* Schedule */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Day filter tabs */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
                      selectedDay === day
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Class list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{classItem.name}</h3>
                        <p className="text-gray-600">with {classItem.trainer}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[classItem.level as keyof typeof levelColors]}`}>
                        {classItem.level}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 font-medium">{classItem.day}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{classItem.startTime} - {classItem.endTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{classItem.description}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Book Class
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gym Hours Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Gym Opening Hours</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-4 px-6 text-left">Day</th>
                      <th className="py-4 px-6 text-left">Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-4 px-6 font-medium">Monday - Friday</td>
                      <td className="py-4 px-6">5:00 AM - 10:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium">Saturday</td>
                      <td className="py-4 px-6">6:00 AM - 8:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium">Sunday</td>
                      <td className="py-4 px-6">8:00 AM - 6:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 