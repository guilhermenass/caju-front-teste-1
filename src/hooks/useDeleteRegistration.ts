import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegistration } from "~/api/registrations";

export function useDeleteRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteRegistration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registrationsByDocument"] });
    },
    onError: (error) => {
      console.error("Erro ao remover o registro:", error);
    },
  });
}
