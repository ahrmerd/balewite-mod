import { ref, readonly, Ref } from "vue";
export interface messageI {
  id: unknown;
  message: string;
  title: string;
  type: "success" | "error" | "warning";
}
export interface useMessageI {
  showFlash: (obj: messageI, duration: number) => void;
  messages: Ref<
    readonly {
      readonly id: Readonly<unknown>;
      readonly message: string;
      readonly title: string;
      readonly type: string;
    }[]
  >;
}

const messages = ref([] as messageI[]);

export function useFlashMessage(): useMessageI {
  const showFlash = (obj: messageI, duration = 5000) => {
    const id = messages.value.length;
    obj.id = id;
    messages.value = [...messages.value, obj];
    setTimeout(
      () =>
        (messages.value = messages.value.filter(
          (message) => message.id !== id
        )),
      duration
    );
  };

  return {
    showFlash,
    messages: readonly(messages),
  };
}
