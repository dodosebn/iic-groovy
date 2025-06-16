'use client';

import React from 'react';
import TagBtn from '@/utils/tagBtn';
import { useTagStore } from '@/app/store/useTagStore';

const FourIt = () => {
  const { selectedTag = '', setTag } = useTagStore();

  const tags = [
    { name: "Getting Started", color: "#1dd7c2", singleRow: true },
    { name: "Health", color: "#83ea6c" },
    { name: "Lifestyle", color: "#ffaeab", singleRow: true },
    { name: "Music", color: "#ffcf00", singleRow: true },
    { name: "Technology", color: "#85b2f4" },
    { name: "Travel", color: "#c5c5fe", singleRow: true },
  ];

  const handleTagClick = (name: string) => {
    setTag(selectedTag === name ? '' : name);
  };

  const singleRowTags = tags.filter(tag => tag.singleRow);
  const gridTags = tags.filter(tag => !tag.singleRow);

  return (
    <section>
      {/* "All" Button */}
      <div className="mb-4">
        <TagBtn
          name="All"
          spanBg="#333"
          onClick={() => setTag('')}
          isActive={selectedTag === ''}
        />
      </div>

      {/* Grid Tags */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {gridTags.map(tag => (
          <TagBtn
            key={tag.name}
            name={tag.name}
            spanBg={tag.color}
            onClick={() => handleTagClick(tag.name)}
            isActive={selectedTag === tag.name}
          />
        ))}
      </div>

      {/* Single Row Tags */}
      {singleRowTags.map(tag => (
        <div key={tag.name} className="flex justify-start mb-4">
          <TagBtn
            name={tag.name}
            spanBg={tag.color}
            onClick={() => handleTagClick(tag.name)}
            isActive={selectedTag === tag.name}
          />
        </div>
      ))}
    </section>
  );
};

export default FourIt;
