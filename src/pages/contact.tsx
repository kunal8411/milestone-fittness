import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // In a real application, you would send the form data to your backend
    // For this demo, we'll simulate an API call with a timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - FITNESS HUB</title>
        <meta name="description" content="Contact FITNESS HUB gym to learn more about our facilities, classes, and membership options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Header */}
        <div className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have questions? We&apos;re here to help! Get in touch with our team.
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Our Location</h3>
                      <p className="text-gray-600">123 Fitness Street, Workout City</p>
                      <p className="text-gray-600">NY 10001, USA</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Phone Number</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 765-4321</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email Address</h3>
                      <p className="text-gray-600">info@fitnesshub.com</p>
                      <p className="text-gray-600">support@fitnesshub.com</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full text-red-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Working Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 5:00 AM - 10:00 PM</p>
                      <p className="text-gray-600">Saturday: 6:00 AM - 8:00 PM</p>
                      <p className="text-gray-600">Sunday: 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-10 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Would Be Here</p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-400 text-green-700 p-6 rounded-lg mb-6"
                  >
                    <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
                    <p>Thank you for getting in touch. Our team will get back to you soon.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name*</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject*</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="membership">Membership Inquiry</option>
                          <option value="classes">Classes Information</option>
                          <option value="trainers">Personal Training</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message*</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className={`w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium 
                          ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'} 
                          transition-colors flex justify-center items-center`}
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Message...
                          </>
                        ) : formStatus === 'error' ? (
                          'Try Again'
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </div>
                    
                    {formStatus === 'error' && (
                      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
                        <p>There was an error sending your message. Please try again.</p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">How do I become a member?</h3>
                <p className="text-gray-600">You can sign up for a membership online through our website, or visit us in person at our facility. We offer various membership plans to suit different needs and budgets.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Can I try the gym before committing to a membership?</h3>
                <p className="text-gray-600">Yes! We offer a free day pass for first-time visitors. You can sign up for a pass online or by contacting our front desk.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Do you offer personal training?</h3>
                <p className="text-gray-600">Absolutely. We have a team of certified personal trainers available for one-on-one sessions. You can book a session through our app or by contacting a staff member at the gym.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">What amenities does your gym offer?</h3>
                <p className="text-gray-600">Our facility includes state-of-the-art equipment, group fitness studios, a cardio area, free weights, locker rooms with showers, sauna, and a smoothie bar.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 