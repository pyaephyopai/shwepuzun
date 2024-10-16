import { useQuery } from "@tanstack/react-query";
import { getDropDownCategories } from "../api/categoryServices";

const useCategoryList = () => {
  const { data = [] } = useQuery({
    queryKey: ["category-list"],
    queryFn: async () =>
      getDropDownCategories().then((response) => {
        if (response.data.code === 200) return response.data.data;
      }),
  });

  return { data };
};

export default useCategoryList;
