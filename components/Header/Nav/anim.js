export const perspective = {
  initial: {
    opacity: 0,
  },
  enter: (i) => ({
    opacity: 1,

    y: 0,

    transition: {
      duration: 0.5,

      delay: 0.35 + i * 0.1,

      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideIn = {
  initial: {
    opacity: 0,

    y: 20,
  },

  enter: (i) => ({
    opacity: 1,

    y: 0,

    transition: {
      duration: 0.5,

      delay: 0.75 + i * 0.1,

      ease: [0.215, 0.61, 0.355, 1],
    },
  }),

  exit: {
    opacity: 0,

    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};
