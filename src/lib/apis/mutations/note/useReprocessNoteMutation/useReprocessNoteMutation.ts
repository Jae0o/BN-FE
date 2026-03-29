import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../axios";
import noteKeys from "../../../queries/note/keys";
import type {
  UseReprocessNoteRequest,
  UseReprocessNoteResponse,
} from "./useReprocessNoteMutation.type";

const reprocessNote = async ({ noteNumber }: UseReprocessNoteRequest) => {
  const response = await api.post<UseReprocessNoteResponse>(
    `/api/v1/notes/${noteNumber}/reprocess`,
  );

  return response.data;
};

const useReprocessNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reprocessNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
    },
  });
};

export default useReprocessNoteMutation;
