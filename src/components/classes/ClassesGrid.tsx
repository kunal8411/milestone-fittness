import { useState, useEffect } from 'react';
import ClassCard from './ClassCard';

interface ClassData {
  id: number;
  name: string;
  description: string;
  trainer: string;
  day: string;
  startTime: string;
  endTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  image?: string;
}

interface ClassesGridProps {
  filter?: string;
  limit?: number;
}

const ClassesGrid: React.FC<ClassesGridProps> = ({ filter, limit }) => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map of existing class images
  const classImages: Record<string, string> = {
    'HIIT': '/images/classes/classHiit.jpg',
    'Yoga': '/images/classes/yeoganew.jpg',
    'Spin Class': '/images/classes/spinclass.jpg',
    'Strength Training': '/images/classes/strengthTraining.jpeg',
    'Pilates': '/images/classes/pilates.jpeg',
    'Kickboxing': '/images/classes/kickboxing.jpeg',
    'CrossFit': '/images/classes/crossfit.jpg',
    'Senior Fitness': '/images/classes/seniorfitness.jpeg',
    'Zumba': '/images/classes/zumba.jpeg',
    'Functional Training': '/images/classes/functionalTraining.jpeg',
    'Yoga Meditation': '/images/classes/yogameditation.jpeg',
    'Self-Defense': '/images/classes/selfDefense.jpeg',
    'Boot Camp': '/images/classes/bootcamp.jpeg',
    'Low Impact Cardio': '/images/classes/lowImpactCardio.jpeg',
    'Friday Night Pump': '/images/classes/fridayNightPump.jpeg',
    'Weekend Warrior': '/images/classes/weekendWarrior.jpeg',
    'Martial Arts Basics': '/images/classes/martialArts.jpeg', 
    'Sunday Stretch': '/images/classes/sundayStreaCH.jpg',
    'Family Fitness': '/images/classes/FAMILYfitness.jpeg',
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        // Build query params if filter is provided
        const queryParams = filter ? `?day=${filter}` : '';
        const response = await fetch(`/api/schedule${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        
        const data = await response.json();
        
        if (!data.success || !data.schedule) {
          throw new Error('Invalid response format from API');
        }
        
        // Add image paths based on class name
        const classesWithImages = data.schedule.map((cls: ClassData) => {
          // Find a matching image by checking if the class name includes any of our image keys
          const imageKey = Object.keys(classImages).find(key => 
            cls.name.toLowerCase().includes(key.toLowerCase())
          );
          
          return {
            ...cls,
            image: imageKey ? classImages[imageKey] : (cls.image || `/images/gym${(cls.id % 4) + 1}.jpg`)
          };
        });
        
        // If limit is provided, only take that many classes
        const limitedData = limit ? classesWithImages.slice(0, limit) : classesWithImages;
        setClasses(limitedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        console.error('Error fetching classes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [filter, limit]);

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
        <p className="text-red-500">Error loading classes: {error}</p>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No classes found for the selected filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((classItem) => (
        <ClassCard
          key={classItem.id}
          title={classItem.name}
          description={classItem.description}
          instructor={classItem.trainer}
          time={`${classItem.startTime} - ${classItem.endTime}`}
          day={classItem.day}
          level={classItem.level}
          imagePath={classItem.image || `/images/gym${(classItem.id % 4) + 1}.jpg`}
        />
      ))}
    </div>
  );
};

export default ClassesGrid; 