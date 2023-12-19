import { create } from 'zustand';

interface IRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<IRegisterModalStore>((set, state) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useRegisterModal;
