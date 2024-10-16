import { useQuery } from "@tanstack/react-query";

import { getAllRoles } from "../api/userService";

const useRoleList = () => {
  const { data = [] } = useQuery({
    queryKey: ["role-list"],
    queryFn: async () =>
      getAllRoles().then((response) => {
        if (response.data.code === 200) return response.data.data;
      }),
  });

  return { data };
};

export default useRoleList;
