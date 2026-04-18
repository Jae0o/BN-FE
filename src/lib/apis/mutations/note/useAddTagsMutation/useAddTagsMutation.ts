import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@shared/api/axios";
import noteKeys from "../../../queries/note/keys";
import type { UseAddTagsRequest, UseAddTagsResponse } from "./useAddTagsMutation.type";

const addTags = async ({ noteNumber, ...data }: UseAddTagsRequest) => {
  const response = await api.post<UseAddTagsResponse>(`/api/v1/notes/${noteNumber}/tags`, data);

  return response.data;
};

const useAddTagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTags,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
    },
  });
};

export default useAddTagsMutation;
