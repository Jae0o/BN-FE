import { useCallback, useState } from "react";

import type { UseModalParams } from "./useModal.type";

const useModal = ({ defaultVisible = false }: UseModalParams = {}) => {
  const [isShow, setIsShow] = useState(defaultVisible);

  const openModal = useCallback(() => {
    setIsShow(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsShow(false);
  }, []);

  return [isShow, openModal, closeModal] as const;
};

export default useModal;
