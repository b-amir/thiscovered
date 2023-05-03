import { useState } from "react";

const useModal = (): any => {
  const [visibleModal, setVisibleModal] = useState(false);
  function toggleModal(): void {
    setVisibleModal(!visibleModal);
  }
  return { toggleModal, visibleModal };
};

export default useModal;
