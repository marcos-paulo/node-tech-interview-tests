export default {
  message: expect.any(String),
  order: {
    id: expect.any(Number),
    isFinished: expect.any(Boolean),
    created_at: expect.any(Date),
  },
};
