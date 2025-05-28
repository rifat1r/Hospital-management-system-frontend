const queryBuilder = (user) => {
  const query = user ? `?id=${user._id}&role=${user.role}` : "";
  return query;
};

export const deleteUser = async (axios, user = null) => {
  const res = await axios.delete(`/auth/profile/delete${queryBuilder(user)}`);
  return res;
};

export const updateUser = async (axios, user) => {
  const res = await axios.patch(
    `/auth/profile/update${queryBuilder(user)}`,
    user
  );
  return res.data;
};

export const getUser = async (axios, user) => {
  const res = await axios.get(`/auth/profile${queryBuilder(user)}`);
  return res.data;
};

export const fetchUsersByRole = async (axios, role) => {
  const res = await axios.get(`/${role}/all`);
  return res.data;
};

export const logoutUser = async (axios) => {
  const res = await axios.get("/auth/logout");
  return res.data;
};

export const updatePassword = async (axios, data) => {
  const res = await axios.patch("/auth/password/update", data);
  return res.data;
};

export const forgotPassword = async (axios, userInfo) => {
  const res = await axios.post("/auth/password/forgot", userInfo);
  return res;
};

export const resetPassword = async (axios, data) => {
  const res = await axios.post(`/auth/password/reset/${data.token}`, data);
  return res;
};
