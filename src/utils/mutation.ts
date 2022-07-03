import { useFlashMessage } from "@/composables/useFlashMessage";
import { useFullScreenLoading } from "@/composables/useFullScreenLoading";
import { client } from "@/init";

const flash = useFlashMessage();
const fullScreenLoading = useFullScreenLoading();

enum MutationTye {
  create,
  update,
  delete,
}

export const generateMutationOptions = (
  type: string,
  cacheKey: string,
  onSuccess: () => void
) => {
  const mutationOptions = {
    onError: (e: any) => {
      console.log(e);
      flash.showFlash(
        {
          title: "error",
          id: `${type}_${cacheKey}_error`,
          message: "that was unexpected",
          type: "error",
        },
        4000
      );
    },
    onMutate: () => {
      fullScreenLoading.startLoading();
    },
    onSettled: () => {
      fullScreenLoading.stopLoading();
    },
    onSuccess: () => {
      client.invalidateQueries(cacheKey);
      flash.showFlash(
        {
          title: "Operation Succesful",
          id: `${type}_${cacheKey}_success`,
          message: "You operation was succesfull",
          type: "success",
        },
        4000
      );
      onSuccess();
      //   emit("close");
    },
  };
  return mutationOptions;
};
