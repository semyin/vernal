import { BASE_QUERY_KEY, updateSite } from ".";
import { useAction } from "../common/useAction";
import { Site } from "./type";

export const useUpdateSite = () => {
  return useAction<Partial<Site>, null>({
    fn: (data) => updateSite(data),
    queryKey: [BASE_QUERY_KEY],
    exact: true,
  });
};