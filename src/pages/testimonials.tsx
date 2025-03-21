import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Testimonial categories
const categories = ['All', 'Weight Loss', 'Muscle Gain', 'Fitness Journey', 'Personal Training'];

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 32,
    image: 'images/users/user1.avif',
    rating: 5,
    category: 'Weight Loss',
    text: "I joined FITNESS HUB after struggling with my weight for years. The supportive environment and personalized training plan helped me lose 30 pounds in just 6 months! The trainers are knowledgeable and always keep me motivated.",
    achievements: 'Lost 30 pounds',
    date: 'July 2023'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    age: 28,
    image: '/images/users/user1.avif',
    rating: 5,
    category: 'Muscle Gain',
    text: "When I started at FITNESS HUB, I was a skinny guy who couldn&apos;t bench press even 100 pounds. Fast forward one year, and I&apos;ve gained 15 pounds of muscle mass and more than doubled my strength. The trainers here know exactly how to push you to achieve your goals.",
    achievements: 'Gained 15 pounds of muscle',
    date: 'May 2023'
  },
  {
    id: 3,
    name: 'Emily Parker',
    age: 45,
    image: '/images/users/user1.avif',
    rating: 4,
    category: 'Fitness Journey',
    text: "After turning 40, I noticed my energy levels dropping and started having back pain. The fitness assessment at FITNESS HUB identified my weak points, and they designed a program specifically for my needs. Five months later, I feel 10 years younger!",
    achievements: 'Increased energy & eliminated back pain',
    date: 'March 2023'
  },
  {
    id: 4,
    name: 'David Wilson',
    age: 52,
    image: '/images/users/user1.avif',
    rating: 5,
    category: 'Personal Training',
    text: "Working with my personal trainer, John, has been life-changing. After my heart surgery, I was afraid to exercise, but John&apos;s expertise in cardiac rehabilitation gave me confidence. His personalized approach and constant encouragement have helped me regain my strength safely.",
    achievements: 'Post-surgery recovery',
    date: 'June 2023'
  },
  {
    id: 5,
    name: 'Jessica Lee',
    age: 30,
    image: '/images/users/user1.avif',
    rating: 5,
    category: 'Weight Loss',
    text: "The nutrition coaching at FITNESS HUB was a game-changer for me. I had been working out for years but never saw the results I wanted. The nutrition plan combined with targeted workouts helped me lose those stubborn last 15 pounds and finally get toned abs!",
    achievements: 'Lost 15 pounds & toned abs',
    date: 'April 2023'
  },
  {
    id: 6,
    name: 'Robert Chang',
    age: 35,
    image: '/images/users/user1.avif',
    rating: 4,
    category: 'Muscle Gain',
    text: "As someone who traveled frequently for work, I struggled to maintain a consistent workout routine. The trainers at FITNESS HUB created a flexible program that I could do anywhere, and the app kept me accountable. I&apos;ve gained significant muscle mass while still maintaining my busy schedule.",
    achievements: 'Built consistent workout routine despite travel',
    date: 'February 2023'
  },
  {
    id: 7,
    name: 'Amanda Foster',
    age: 41,
    image: '/images/users/user1.avif',
    rating: 5,
    category: 'Fitness Journey',
    text: "After having my second child, I needed to find a gym that offered childcare. FITNESS HUB not only had amazing childcare services but also provided a supportive community of other moms. The specialized post-pregnancy workout plan helped me regain my strength and confidence.",
    achievements: 'Post-pregnancy fitness recovery',
    date: 'January 2023'
  },
  {
    id: 8,
    name: 'Thomas Green',
    age: 60,
    image: '/images/users/user1.avif',
    rating: 5,
    category: 'Personal Training',
    text: "At 60, I was concerned about starting a fitness program, but my trainer Emma designed workouts that were challenging yet safe for my age. I&apos;ve improved my balance, increased my bone density, and have more energy than I did a decade ago. It&apos;s never too late to start!",
    achievements: 'Improved mobility & bone density at 60',
    date: 'August 2023'
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter testimonials based on selected category
  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Testimonials - FITNESS HUB</title>
        <meta name="description" content="Read what our members say about their fitness journey with FITNESS HUB." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Header */}
        <div className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl max-w-2xl mx-auto">
              See how FITNESS HUB has transformed the lives of our members.
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Category filters */}
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                >
                  {/* Testimonial Header */}
                  <div className="p-6 bg-gray-50 border-b">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <span>Photo</span>
                        </div>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-600 ">{testimonial.name}</h3>
                        <p className="text-gray-500">Age: {testimonial.age}</p>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="p-6 flex-grow">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                        {testimonial.category}
                      </span>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <div className="mt-auto">
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm font-medium text-gray-800">
                          <span className="font-bold">Achievement:</span> {testimonial.achievements}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note for placeholder images */}
            <div className="mt-10 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-center">
                Note: This is a demo with placeholder references. In a real application, you would need to add actual member photos to the public/images/testimonials directory.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join FITNESS HUB today and start your transformation journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </motion.a>
              <motion.a 
                href="/plans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-900 transition-colors"
              >
                View Membership Plans
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 