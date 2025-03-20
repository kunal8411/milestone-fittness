import { motion } from 'framer-motion';

interface ClassCardProps {
  title: string;
  description: string;
  instructor: string;
  time: string;
  day: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  imagePath: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  description,
  instructor,
  time,
  day,
  level,
  imagePath,
}) => {
  // Level badge color mapping
  const levelColors = {
    Beginner: 'bg-green-500',
    Intermediate: 'bg-yellow-500',
    Advanced: 'bg-red-500',
    'All Levels': 'bg-blue-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 w-full">
        {imagePath ? (
          <img
            src={imagePath}
            alt={`${title} class`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-400">
            <span className="text-sm">Image Coming Soon</span>
          </div>
        )}
        <div className="absolute top-0 right-0 m-2">
          <span
            className={`${
              levelColors[level]
            } text-white text-xs font-bold px-2 py-1 rounded`}
          >
            {level}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{day}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        <div className="flex items-center mt-2">
          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-300">Instructor: <span className="font-medium">{instructor}</span></span>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassCard; 