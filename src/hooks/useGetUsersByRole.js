import { useQuery } from "@tanstack/react-query";
import { fetchUsersByRole } from "../api/userApi";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsersByRole = (userType) => {
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [userType, "all-users"],
    queryFn: async () => {
      const res = await fetchUsersByRole(axiosSecure, userType);
      return res;
    },
  });

  // users key like --> doctors,patiets, etc.
  const key = userType + "s";
  const users = data[key] || [];

  const count = data.count;

  return { users, count, refetch, isLoading };
};

export default useGetUsersByRole;
