import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ClassesGrid from '../components/classes/ClassesGrid';
import { motion } from 'framer-motion';

const daysOfWeek = [
  'All',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function Classes() {
  const [activeDay, setActiveDay] = useState('All');

  return (
    <>
      <Head>
        <title>Classes | Milestone Fitness</title>
        <meta name="description" content="Explore our wide range of fitness classes at Milestone Fitness" />
      </Head>

      <Navbar />

      <main className="bg-gray-900 text-white min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative h-80 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-gray-900/70 z-10"></div>
            <img
              src="/images/gymdemo3.jpg"
              alt="Fitness classes"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
              }}
            />
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-4"
            >
              Our Classes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl"
            >
              Achieve your fitness goals with our diverse range of classes led by expert trainers
            </motion.p>
          </div>
        </section>

        {/* Filter by Day */}
        <section className="py-10 px-4 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Filter by Day</h2>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeDay === day
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Grid */}
          <ClassesGrid filter={activeDay === 'All' ? undefined : activeDay} />
        </section>
      </main>

      <Footer />
    </>
  );
} 