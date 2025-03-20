import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import ClassesGrid from "@/components/classes/ClassesGrid";
import TrainersGrid from "@/components/trainers/TrainersGrid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Milestone Fitness - Your Premier Gym Destination</title>
        <meta
          name="description"
          content="Join Milestone Fitness for top-tier fitness facilities, expert personal trainers, and specialized group classes for all fitness levels."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section with Image Slider */}
        <Hero />

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Milestone Fitness?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the difference with our state-of-the-art facilities
                and professional trainers dedicated to helping you achieve your
                fitness goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-red-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Classes Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Our Popular Classes
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover a variety of exciting fitness classes led by our expert
                trainers to help you achieve your health and fitness goals.
              </p>
            </div>

            {/* Use new ClassesGrid component with limit of 3 */}
            <ClassesGrid limit={3} />

            <div className="mt-12 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/classes"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  View All Classes
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trainers Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Our Expert Trainers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our certified trainers are here to guide you through your
                fitness journey with expertise and personalized attention.
              </p>
            </div>

            {/* Use new TrainersGrid component with limit of 3 */}
            <TrainersGrid limit={3} />

            <div className="text-center mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/trainers"
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Meet All Trainers
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See what our members have to say about their fitness journey
                with Milestone Fitness.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {testimonialsPreview.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md mb-8"
                >
                  <div className="flex items-start">
                    <div className="hidden md:block relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 mr-6 flex-shrink-0">
                      <img
                        src={"/images/users/user1.avif"}
                        alt={"sfdsfsdaf"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.828 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-gray-700 italic mb-4 text-lg">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-gray-500 text-sm">
                            {testimonial.achievement}
                          </p>
                        </div>
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                          {testimonial.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/testimonials"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Read More Success Stories
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Membership Preview */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Membership Plans
              </h2>
              <p className="text-xl max-w-2xl mx-auto">
                Choose the perfect plan that fits your fitness goals and budget
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {membershipPreview.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-lg overflow-hidden ${
                    plan.popular
                      ? "border-2 border-red-500"
                      : "border border-gray-700"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-red-600 text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                    </div>
                    <ul className="mb-6 space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <svg
                            className="w-5 h-5 text-green-400 mr-2 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
          </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/plans"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  View All Plans
                </Link>
              </motion.div>
            </div>
        </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our services or ready to start your
                  fitness journey? Contact us today!
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        123 Fitness Street, Workout City
                      </p>
                      <p className="text-gray-600">NY 10001, USA</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Phone Number</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email Address</h3>
                      <p className="text-gray-600">info@milestonefitness.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map / Contact Form Preview</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Body?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of fitness enthusiasts and achieve your health
              goals with expert guidance.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-block bg-white hover:bg-gray-100 text-red-600 font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
              >
                Start Your Fitness Journey Today
              </Link>
            </motion.div>
    </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Feature icons and data
const features = [
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Modern Equipment",
    description:
      "Our gym is equipped with the latest fitness technology and machines to provide you with the best workout experience.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    title: "Expert Trainers",
    description:
      "Our certified personal trainers provide personalized guidance to help you achieve your fitness goals safely and efficiently.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Diverse Classes",
    description:
      "From high-intensity interval training to yoga and pilates, we offer a wide range of classes for all fitness levels.",
  },
];

// Testimonials preview data
const testimonialsPreview = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "I joined Milestone Fitness after struggling with my weight for years. The supportive environment and personalized training plan helped me lose 30 pounds in just 6 months!",
    achievement: "Lost 30 pounds",
    category: "Weight Loss",
  },
  {
    name: "Michael Rodriguez",
    rating: 5,
    text: "When I started at Milestone Fitness, I was a skinny guy who couldn&apos;t bench press even 100 pounds. Fast forward one year, and I&apos;ve gained 15 pounds of muscle mass and more than doubled my strength.",
    achievement: "Gained 15 pounds of muscle",
    category: "Muscle Gain",
  },
];

// Membership preview data
const membershipPreview = [
  {
    name: "1 Month",
    price: "$49",
    features: [
      "Full access to gym equipment",
      "2 Free personal training sessions",
      "Access to fitness classes",
    ],
    popular: false,
  },
  {
    name: "3 Months",
    price: "$129",
    features: [
      "Full access to gym equipment",
      "4 Free personal training sessions",
      "Unlimited fitness classes",
      "Nutrition consultation",
    ],
    popular: true,
  },
  {
    name: "6 Months",
    price: "$239",
    features: [
      "Full access to gym equipment",
      "8 Free personal training sessions",
      "Unlimited fitness classes",
      "Nutrition consultation",
    ],
    popular: false,
  },
  {
    name: "1 Year",
    price: "$449",
    features: [
      "Full access to gym equipment",
      "12 Free personal training sessions",
      "Unlimited fitness classes",
      "Free gym merchandise",
    ],
    popular: false,
  },
];
