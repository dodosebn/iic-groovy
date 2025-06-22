'use client';

import React, { useEffect, useState } from 'react';

import { useTagStore } from '@/app/store/useTagStore';
import HomeWrapper from './customs/homeWrapper';
import Page1Maps from './data/page1Maps';

const HomePage = ({ num1, num2 }: { num1: number; num2: number }) => {
  const { selectedTag } = useTagStore();
  const [filtered, setFiltered] = useState(Page1Maps);

  useEffect(() => {
    console.log('[HomePage] selectedTag changed:', selectedTag);
    if (selectedTag) {
      setFiltered(
        Page1Maps.filter(
          (item) =>
            item.tag?.toLowerCase().trim() === selectedTag.toLowerCase().trim()
        )
      );
    } else {
      setFiltered(Page1Maps);
    }
  }, [selectedTag]);

  const visible = filtered.slice(num1, num2);

  return (
    <div className="home-container">
      {/* <p>
        🏷️ Filter: <strong>{selectedTag ?? 'None (showing all)'}</strong>{' '}
        – showing {visible.length} of {filtered.length}
      </p> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {visible.map((item) => (
          <HomeWrapper key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
