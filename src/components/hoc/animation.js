import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {

    opacity: 0
  },
  in: {

    opacity: 1
  },
  out: {
    opacity: 0
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.5,
};

const animation = (Component) => {
  return (props) => (
    
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="sub-section"
    >
      <Component {...props} />
    </motion.div>
  );
};

export default animation;
