'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTagStore } from '@/app/store/useTagStore';
import HomeWrapper from './customs/homeWrapper';
import Page1Maps from './data/page1Maps';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const HomePage = ({ num1, num2 }: { num1: number; num2: number }) => {
  const { selectedTag } = useTagStore();
  const [filtered, setFiltered] = useState(Page1Maps);

  useEffect(() => {
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
      <AnimatePresence mode="wait" initial={false}>
        {visible.length > 0 && (
          <motion.div
            key={selectedTag || 'all'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {visible.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
              >
                <HomeWrapper {...item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
