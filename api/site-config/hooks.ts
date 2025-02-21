import { queryKey, updateSite } from ".";
import { useAction } from "../common/useAction";
import { Site } from "./type";

export const useUpdateSite = () => {
  return useAction<{}, Partial<Site>, null>({
    fn: (data) => updateSite(data),
    queryKey
  });
};