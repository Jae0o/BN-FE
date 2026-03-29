import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../axios";
import noteKeys from "../../../queries/note/keys";
import type { UseRemoveTagsRequest, UseRemoveTagsResponse } from "./useRemoveTagsMutation.type";

const removeTags = async ({ noteNumber, ...data }: UseRemoveTagsRequest) => {
  const response = await api.delete<UseRemoveTagsResponse>(`/api/v1/notes/${noteNumber}/tags`, {
    data,
  });

  return response.data;
};

const useRemoveTagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTags,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
    },
  });
};

export default useRemoveTagsMutation;
