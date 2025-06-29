'use client';

import React, { useRef } from 'react';
import TagBtn from '@/utils/tagBtn';
import { useTagStore } from '@/app/store/useTagStore';

const FourIt = () => {
  const { selectedTag = '', setTag } = useTagStore();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (name: string) => {
    setTag(selectedTag === name.toLowerCase() ? '' : name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={contentRef}>
      {/* All Tag */}
      <div className="mb-4">
        <TagBtn
          name="All"
          spanBg="#333"
          onClick={() => {
            setTag('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isActive={selectedTag === ''}
        />
      </div>

      {/* Getting Started (solo row) */}
      <div className="mb-4">
        <TagBtn
          name="Getting Started"
          spanBg="#1dd7c2"
          onClick={() => handleTagClick('Getting Started')}
          isActive={selectedTag === 'Getting Started'}
        />
      </div>

      {/* Health + Lifestyle (same row) */}
      <div className="flex flex-wrap gap-3 mb-4">
        <TagBtn
          name="Health"
          spanBg="#83ea6c"
          onClick={() => handleTagClick('Health')}
          isActive={selectedTag === 'Health'}
        />
        <TagBtn
          name="Lifestyle"
          spanBg="#ffaeab"
          onClick={() => handleTagClick('Lifestyle')}
          isActive={selectedTag === 'Lifestyle'}
        />
      </div>

      {/* Music (solo row) */}
      <div className="mb-4">
        <TagBtn
          name="Music"
          spanBg="#ffcf00"
          onClick={() => handleTagClick('Music')}
          isActive={selectedTag === 'Music'}
        />
      </div>

      {/* Technology (solo row) */}
      <div className="mb-4">
        <TagBtn
          name="Technology"
          spanBg="#85b2f4"
          onClick={() => handleTagClick('Technology')}
          isActive={selectedTag === 'Technology'}
        />
      </div>

      {/* Travel (solo row) */}
      <div className="mb-4">
        <TagBtn
          name="Travel"
          spanBg="#c5c5fe"
          onClick={() => handleTagClick('Travel')}
          isActive={selectedTag === 'Travel'}
        />
      </div>
    </section>
  );
};

export default FourIt;
