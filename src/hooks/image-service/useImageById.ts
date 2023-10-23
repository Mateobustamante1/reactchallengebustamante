import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../react-query/keys";
import { getImagesByIdService } from "../../service/api";

export function useImageById(id?: string) {
  return useQuery({
    queryKey: [QueryKeys.GET_IMAGES_BY_ID, id],
    queryFn: () => getImagesByIdService(id),
    enabled: !!id,
  });
}
