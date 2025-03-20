import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Define categories for filtering
const categories = ['All', 'Gym', 'Classes', 'Events', 'Equipment'];

// Mock gallery data (in a real app, this would come from an API)
const galleryImages = [
  {
    id: 1,
    src: '/images/gallery/gym1.jpg',
    alt: 'Modern gym interior with equipment',
    category: 'Gym',
    title: 'State-of-the-art Facility'
  },
  {
    id: 2,
    src: '/images/gallery/class1.jpg',
    alt: 'Group fitness class',
    category: 'Classes',
    title: 'HIIT Class'
  },
  {
    id: 3,
    src: '/images/gallery/equipment1.jpg',
    alt: 'Weight training equipment',
    category: 'Equipment',
    title: 'Free Weights Area'
  },
  {
    id: 4,
    src: '/images/gallery/event1.jpg',
    alt: 'Fitness competition event',
    category: 'Events',
    title: 'Annual Fitness Challenge'
  },
  {
    id: 5,
    src: '/images/gallery/gym2.jpg',
    alt: 'Cardio zone with treadmills',
    category: 'Gym',
    title: 'Cardio Zone'
  },
  {
    id: 6,
    src: '/images/gallery/class2.jpg',
    alt: 'Yoga class in session',
    category: 'Classes',
    title: 'Morning Yoga'
  },
  {
    id: 7,
    src: '/images/gallery/equipment2.jpg',
    alt: 'Row of exercise bikes',
    category: 'Equipment',
    title: 'Spin Bike Studio'
  },
  {
    id: 8,
    src: '/images/gallery/gym3.jpg',
    alt: 'Stretching area',
    category: 'Gym',
    title: 'Stretching Zone'
  },
  {
    id: 9,
    src: '/images/gallery/class3.jpg',
    alt: 'Boxing class',
    category: 'Classes',
    title: 'Kickboxing Class'
  },
  {
    id: 10,
    src: '/images/gallery/event2.jpg',
    alt: 'Gym anniversary celebration',
    category: 'Events',
    title: '5 Year Anniversary'
  },
  {
    id: 11,
    src: '/images/gallery/gym4.jpg',
    alt: 'Functional training area',
    category: 'Gym',
    title: 'Functional Training Zone'
  },
  {
    id: 12,
    src: '/images/gallery/equipment3.jpg',
    alt: 'Kettlebell rack',
    category: 'Equipment',
    title: 'Kettlebell Collection'
  },
  {
    id: 13,
    src: '/images/gallery/class4.jpg',
    alt: 'Spin class',
    category: 'Classes',
    title: 'Evening Spin Class'
  },
  {
    id: 14,
    src: '/images/gallery/event3.jpg',
    alt: 'Charity fitness event',
    category: 'Events',
    title: 'Charity Fitness Marathon'
  },
  {
    id: 15,
    src: '/images/gallery/gym5.jpg',
    alt: 'Swimming pool',
    category: 'Gym',
    title: 'Indoor Swimming Pool'
  },
];

// Define the Modal component for larger image view
const ImageModal = ({ image, isOpen, onClose }: { 
  image: typeof galleryImages[0] | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Loading image...</p>
              </div>
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p className="text-gray-600">{image.category}</p>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <>
      <Head>
        <title>Gallery - FITNESS HUB</title>
        <meta name="description" content="View our gym's facilities, classes, events and equipment through our photo gallery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Header */}
        <div className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Take a look inside our facilities and get a glimpse of our vibrant fitness community.
            </p>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category filter tabs */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
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

            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                    className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openModal(image)}
                  >
                    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                      <p className="text-gray-500">Loading...</p>
                    </div>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                      <div className="p-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-bold">{image.title}</h3>
                        <p className="text-sm text-gray-200">{image.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Note for placeholder images */}
            <div className="mt-10 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-center">
                Note: This is a demo with placeholder references. In a real application, you would need to add actual images to the public/images/gallery directory.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      <ImageModal 
        image={selectedImage} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />

      <Footer />
    </>
  );
} 