import api from "../lib/axios";

export const userService = {
  getCurrentUser: async () => {
    const { data } = await api.get("/users/me");
    return data;
  },

  // getUser: async (userId) => {
  //   const { data } = await api.get(`/users/${userId}`);
  //   return data;
  // },

  // updateUser: async (userId, userData) => {
  //   const { data } = await api.put(`/users/${userId}`, userData);
  //   return data;
  // },
};
