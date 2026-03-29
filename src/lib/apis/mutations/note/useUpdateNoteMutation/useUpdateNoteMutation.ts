import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../axios";
import noteKeys from "../../../queries/note/keys";
import type { UseUpdateNoteRequest, UseUpdateNoteResponse } from "./useUpdateNoteMutation.type";

const updateNote = async ({ noteNumber, ...data }: UseUpdateNoteRequest) => {
  const response = await api.patch<UseUpdateNoteResponse>(`/api/v1/notes/${noteNumber}`, data);

  return response.data;
};

const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.detail(variables.noteNumber),
      });
      queryClient.invalidateQueries({ queryKey: noteKeys.lists });
    },
  });
};

export default useUpdateNoteMutation;
