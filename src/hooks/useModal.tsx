import { useState } from "react";

const useModal = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  function toggleModal(): void {
    setVisibleModal(!visibleModal);
  }
  return { toggleModal, visibleModal };
};

export default useModal;
