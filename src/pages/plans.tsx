import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    id: 'monthly',
    name: '1 Month',
    price: '$49',
    description: 'Perfect for trying out our gym',
    features: [
      'Full access to gym equipment',
      '2 Free personal training sessions',
      'Access to fitness classes',
      'Locker room access',
      'No commitment required'
    ],
    highlight: false
  },
  {
    id: 'quarterly',
    name: '3 Months',
    price: '$129',
    description: 'Our most popular package',
    features: [
      'Full access to gym equipment',
      '4 Free personal training sessions',
      'Unlimited fitness classes',
      'Locker room access',
      'Nutrition consultation'
    ],
    highlight: true
  },
  {
    id: 'biannual',
    name: '6 Months',
    price: '$239',
    description: 'Serious about fitness',
    features: [
      'Full access to gym equipment',
      '8 Free personal training sessions',
      'Unlimited fitness classes',
      'Locker room access',
      'Nutrition consultation',
      'Body composition analysis'
    ],
    highlight: false
  },
  {
    id: 'annual',
    name: '1 Year',
    price: '$449',
    description: 'Best value for dedicated fitness',
    features: [
      'Full access to gym equipment',
      '12 Free personal training sessions',
      'Unlimited fitness classes',
      'Locker room access',
      'Nutrition consultation',
      'Body composition analysis',
      'Free gym merchandise'
    ],
    highlight: false
  }
];

export default function Plans() {
  return (
    <>
      <Head>
        <title>Membership Plans - FITNESS HUB</title>
        <meta name="description" content="Choose from our variety of membership plans tailored to your fitness needs and goals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Header */}
        <div className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Membership Plans</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Choose the perfect membership plan that aligns with your fitness goals and budget.
            </p>
          </div>
        </div>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div 
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-lg overflow-hidden border ${
                    plan.highlight 
                      ? 'border-red-600 shadow-xl' 
                      : 'border-gray-200 shadow-md'
                  }`}
                >
                  {plan.highlight && (
                    <div className="bg-red-600 text-white text-center py-2 font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className={`p-8 ${plan.highlight ? 'bg-red-50' : 'bg-white'}`}>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500">/period</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg 
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5" 
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
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        plan.highlight 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-gray-800 hover:bg-gray-900 text-white'
                      }`}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Can I freeze my membership?</h3>
                <p className="text-gray-600">Yes, you can freeze your membership for up to 30 days per year with no additional cost. For longer periods, a small maintenance fee may apply.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Is there a joining fee?</h3>
                <p className="text-gray-600">There is a one-time joining fee of $25 for new members, which covers your access card and initial fitness assessment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Can I cancel my membership?</h3>
                <p className="text-gray-600">You can cancel your membership with 30 days' notice. For 1-month memberships, no notice is required if you choose not to renew.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Are there family discounts?</h3>
                <p className="text-gray-600">Yes, we offer a 10% discount on additional family memberships when two or more family members join together.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 