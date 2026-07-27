import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/animations/ScrollReveal';
import AudioWaveform from '../components/ui/AudioWaveform';
import { Play, ExternalLink, Quote } from 'lucide-react';

const performances = [
  {
    id: 1,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/0I0D1FIiERo/maxresdefault.jpg",
    videoUrl: "https://youtu.be/0I0D1FIiERo"
  },
  {
    id: 2,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/z64utlLCFl0/maxresdefault.jpg",
    videoUrl: "https://youtu.be/z64utlLCFl0"
  },
  {
    id: 3,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/oVMW-3CUr78/maxresdefault.jpg",
    videoUrl: "https://youtu.be/oVMW-3CUr78"
  },
  {
    id: 4,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/N56c62wGcdQ/maxresdefault.jpg",
    videoUrl: "https://youtu.be/N56c62wGcdQ"
  },
  {
    id: 5,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/oIa9KMFBeE0/maxresdefault.jpg",
    videoUrl: "https://youtu.be/oIa9KMFBeE0"
  },
  {
    id: 6,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/Ar-Mf8fM4-8/maxresdefault.jpg",
    videoUrl: "https://youtu.be/Ar-Mf8fM4-8"
  },
  {
    id: 7,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/3NvrjJlpccE/maxresdefault.jpg",
    videoUrl: "https://youtu.be/3NvrjJlpccE"
  },
  {
    id: 8,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/OWud-jwUNWQ/maxresdefault.jpg",
    videoUrl: "https://youtu.be/OWud-jwUNWQ"
  },
  {
    id: 9,
    title: "DYSO Performance",
    date: "Concert Recording",
    thumbnail: "https://img.youtube.com/vi/6HkXTj99-yg/maxresdefault.jpg",
    videoUrl: "https://youtu.be/6HkXTj99-yg"
  }
];

const playlists = [
  {
    id: 1,
    title: "2019-2020 Season",
    url: "https://youtube.com/playlist?list=PL0V3zPJmJFKBM08DDWjmdD_QJQA8HUkjx"
  },
  {
    id: 2,
    title: "2018-2019 Season",
    url: "https://youtube.com/playlist?list=PL0V3zPJmJFKDMfVkoSXotZ-9QLNmlRCCM"
  },
  {
    id: 3,
    title: "2017-2018 Season",
    url: "https://youtube.com/playlist?list=PL0V3zPJmJFKAoZPP2zZZYFlP_6gT4v7L3"
  },
  {
    id: 4,
    title: "2016-2017 Season",
    url: "https://youtube.com/playlist?list=PL0V3zPJmJFKDct1aoDHi5ZEx27Cq_7ViV"
  },
  {
    id: 5,
    title: "Historical DYSO Collection",
    url: "https://www.youtube.com/playlist?list=PL0V3zPJmJFKAcfg3hqJGrw6TIcoo1FmN7"
  }
];

export default function Listen() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#0a0a0a] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase">
              Performances
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] italic mt-4 mb-6">
              The Gallery
            </h1>
            <p className="text-[#a1a1a1] max-w-xl mx-auto">
              Experience our performances. Each piece tells a story of dedication, passion, and musical excellence.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="relative">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0a0a0a]/80 border border-[#333] flex items-center justify-center text-[#ededed] hover:border-[#2e8b57] transition-colors"
          >
            ←
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0a0a0a]/80 border border-[#333] flex items-center justify-center text-[#ededed] hover:border-[#2e8b57] transition-colors"
          >
            →
          </button>
        )}

        {/* Gradient Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {performances.map((performance, index) => (
            <motion.div
              key={performance.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[350px] md:w-[450px] group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  src={performance.thumbnail}
                  alt={performance.title}
                  className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                
                {/* Play Button Overlay */}
                <a 
                  href={performance.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-[#2e8b57] flex items-center justify-center cursor-pointer"
                  >
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </motion.div>
                </a>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <AudioWaveform isPlaying={false} />
                    <h3 className="font-serif text-xl text-[#ededed] italic">
                      {performance.title}
                    </h3>
                  </div>
                  <p className="text-[#a1a1a1] text-sm">{performance.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      <div className="px-6 max-w-6xl mx-auto mt-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-[#ededed] italic mb-4">
              Full Season Playlists
            </h2>
            <p className="text-[#a1a1a1]">
              Explore complete seasons of DYSO performances
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist, index) => (
            <ScrollReveal key={playlist.id} delay={index * 0.1}>
              <a
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-[#1c1c1c] border border-[#333] rounded-2xl p-6 hover:border-[#2e8b57] transition-all hover:bg-[#1c1c1c]/80"
              >
                <div className="flex items-start justify-between mb-4">
                  <ExternalLink className="w-5 h-5 text-[#2e8b57]" />
                </div>
                <h3 className="font-serif text-xl text-[#ededed] italic mb-2 group-hover:text-[#2e8b57] transition-colors">
                  {playlist.title}
                </h3>
                <p className="text-[#a1a1a1] text-sm">
                  Watch full playlist on YouTube
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}