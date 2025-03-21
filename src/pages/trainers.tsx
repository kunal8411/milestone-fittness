import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Trainer data
const trainers = [
  {
    id: 1,
    name: "Amit Sharma",
    role: 'Head Fitness Coach',
    image: '/images/trainers/trainer1new.jpg',
    specializations: ['Strength Training', 'HIIT', 'Nutrition'],
    bio: 'John is a certified personal trainer with over 10 years of experience helping clients achieve their fitness goals. His specialty is strength training and high-intensity interval training.',
    certifications: ['NASM Certified Personal Trainer', 'CrossFit Level 2 Trainer', 'Precision Nutrition Certified'],
  },
  {
    id: 2,
    name: "Priya Patel",
    role: 'Yoga & Pilates Instructor',
    image: '/images/trainers/trainer2new.jpg',
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
    name: "Pankaj Kapoor",
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
    image: '/images/trainers/trainer5.jpg',
    specializations: ['Martial Arts', 'Self-Defense', 'Core Training'],
    bio: 'David brings discipline and focus to his training sessions with a background in various martial arts. His classes combine self-defense techniques with intense core workouts.',
    certifications: ['3rd Degree Black Belt in Taekwondo', 'Kickboxing Instructor', 'Self-Defense Specialist'],
  }
];

// Available specialization filters
const specializations = [
  'All',
  'Strength Training',
  'Yoga',
  'Pilates',
  'HIIT',
  'Weight Loss',
  'Martial Arts',
  'Senior Fitness',
  'Sports Performance',
];

export default function Trainers() {
  const [filter, setFilter] = useState('All');

  // Filter trainers based on selected specialization
  const filteredTrainers = filter === 'All'
    ? trainers
    : trainers.filter(trainer => trainer.specializations.includes(filter));

  return (
    <>
      <Head>
        <title>Our Trainers - FITNESS HUB</title>
        <meta name="description" content="Meet our expert fitness trainers who will guide you on your fitness journey with personalized programs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Header */}
        <div className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Expert Trainers</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Meet the fitness professionals dedicated to helping you achieve your health and fitness goals.
            </p>
          </div>
        </div>

        {/* Specialization Filters */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {specializations.map((specialization) => (
                <button
                  key={specialization}
                  onClick={() => setFilter(specialization)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                    filter === specialization
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {specialization}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Trainers Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainers.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-80 w-full">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-1 text-gray-600 ">{trainer.name}</h2>
                    <p className="text-red-600 font-semibold mb-4">{trainer.role}</p>
                    
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">SPECIALIZATIONS</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainer.specializations.map((specialization) => (
                        <span 
                          key={specialization}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialization}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-6">{trainer.bio}</p>
                    
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">CERTIFICATIONS</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {trainer.certifications.map((certification, i) => (
                        <li key={i}>{certification}</li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Book a Session
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our trainers are ready to help you reach your fitness goals with personalized programs.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-red-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 