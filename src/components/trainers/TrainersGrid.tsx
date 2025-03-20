import { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';

interface TrainerData {
  id: number;
  name: string;
  role: string;
  image?: string;
  bio: string;
  specializations: string[];
  certifications: string[];
}

interface TrainersGridProps {
  limit?: number;
  specialty?: string;
}

const TrainersGrid: React.FC<TrainersGridProps> = ({ limit, specialty }) => {
  const [trainers, setTrainers] = useState<TrainerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default trainer images mapping
  const trainerImages: Record<string, string> = {
    'John Davis': '/images/trainers/john-davis.jpg',
    'Sarah Wilson': '/images/trainers/sarah-wilson.jpg',
    'Mike Johnson': '/images/trainers/mike-johnson.jpg',
    'Emma Roberts': '/images/trainers/emma-roberts.jpg',
    'David Kim': '/images/trainers/david-kim.jpg',
    'Lisa Torres': '/images/trainers/lisa-torres.jpg',
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        // Build query params if specialty is provided
        const queryParams = specialty ? `?specialization=${specialty}` : '';
        const response = await fetch(`/api/trainers${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        
        const data = await response.json();
        
        if (!data.success || !data.trainers) {
          throw new Error('Invalid response format from API');
        }
        
        // Add image paths based on trainer name
        const trainersWithImages = data.trainers.map((trainer: TrainerData) => {
          return {
            ...trainer,
            image: trainer.image || trainerImages[trainer.name] || `/images/gym${(trainer.id % 4) + 1}.jpg`
          };
        });
        
        // If limit is provided, only take that many trainers
        const limitedData = limit ? trainersWithImages.slice(0, limit) : trainersWithImages;
        setTrainers(limitedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        console.error('Error fetching trainers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [limit, specialty]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading trainers: {error}</p>
      </div>
    );
  }

  if (trainers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No trainers found for the selected specialty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          name={trainer.name}
          role={trainer.role}
          bio={trainer.bio}
          specialties={trainer.specializations}
          imagePath={trainer.image || `/images/gym${(trainer.id % 4) + 1}.jpg`}
        />
      ))}
    </div>
  );
};

export default TrainersGrid; 