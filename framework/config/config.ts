export default {
  baseURL: process.env.TEST_BASE_URL ?? '',
  credentials: {
    email: process.env.TEST_EMAIL ?? '',
    password: process.env.TEST_PASSWORD ?? '',
  },
};
