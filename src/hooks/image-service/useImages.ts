import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../react-query/keys";
import { getImagesService } from "../../service/api";

export function useImages() {
  return useQuery({
    queryKey: [QueryKeys.GET_IMAGES],
    queryFn: getImagesService,
  });
}
