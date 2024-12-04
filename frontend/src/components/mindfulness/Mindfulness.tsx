import { useState } from 'react';
import { Play, Pause, Clock, Heart, Brain, Wind } from 'lucide-react';

type VideoResource = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'meditation' | 'breathing' | 'mindfulness';
};

const resources: VideoResource[] = [
  {
    id: 'O-6f5wQXSu8',
    title: '10-Minute Meditation for Beginners',
    description: 'A gentle introduction to meditation practice, perfect for beginners.',
    duration: '10 min',
    category: 'meditation'
  },
  {
    id: 'inpok4MKVLM',
    title: '5-Minute Breathing Exercise',
    description: 'Quick breathing technique to reduce stress and anxiety.',
    duration: '5 min',
    category: 'breathing'
  },
  {
    id: 'ZToicYcHIOU',
    title: 'Mindful Body Scan',
    description: 'Guided body scan meditation for relaxation and awareness.',
    duration: '15 min',
    category: 'mindfulness'
  },
  {
    id: 'F28MGLlpP90',
    title: 'Deep Breathing for Sleep',
    description: 'Calming breathing exercises to help you fall asleep.',
    duration: '8 min',
    category: 'breathing'
  },
  {
    id: 'SEfs5TJZ6Nk',
    title: 'Loving-Kindness Meditation',
    description: 'Develop compassion and kindness through guided meditation.',
    duration: '12 min',
    category: 'meditation'
  },
  {
    id: 'QHkXvPq2pQE',
    title: 'Mindful Walking Practice',
    description: 'Learn to practice mindfulness while walking.',
    duration: '10 min',
    category: 'mindfulness'
  }
];

export function Mindfulness() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'meditation' | 'breathing' | 'mindfulness'>('all');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources', icon: Heart },
    { id: 'meditation', label: 'Meditation', icon: Brain },
    { id: 'breathing', label: 'Breathing', icon: Wind },
    { id: 'mindfulness', label: 'Mindfulness', icon: Clock },
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Mindfulness Resources</h1>
        <p className="text-muted-foreground">
          Access curated meditation, breathing exercises, and mindfulness videos to support your mental wellness journey.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeCategory === id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card hover:bg-accent'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Video Player */}
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {activeVideo ? (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video bg-accent flex items-center justify-center">
              <p className="text-muted-foreground">Select a video to start</p>
            </div>
          )}
        </div>

        {/* Video List */}
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => setActiveVideo(resource.id)}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                activeVideo === resource.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-accent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{resource.title}</h3>
                <span className="text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {resource.duration}
                </span>
              </div>
              <p className={`text-sm ${
                activeVideo === resource.id
                  ? 'text-primary-foreground/80'
                  : 'text-muted-foreground'
              }`}>
                {resource.description}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {activeVideo === resource.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span className="text-sm capitalize">{resource.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 