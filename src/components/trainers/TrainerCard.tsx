import { motion } from 'framer-motion';

interface TrainerCardProps {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  imagePath: string;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  name,
  role,
  bio,
  specialties,
  imagePath,
}) => {
  console.log("/imagePathimagePathimagePath",imagePath)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64 w-full">
        {imagePath ? (
          <img
            src={imagePath}
            alt={`${name} - ${role}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-400">
            <span className="text-sm">Trainer Photo</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-red-500 font-medium mb-3">{role}</p>
        <p className="text-gray-300 text-sm mb-4">{bio}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {specialties.map((specialty, i) => (
            <span 
              key={i} 
              className="bg-gray-700 px-2 py-1 rounded-full text-xs font-medium text-gray-200"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrainerCard; 