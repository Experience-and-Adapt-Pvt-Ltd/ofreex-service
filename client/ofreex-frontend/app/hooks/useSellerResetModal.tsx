import { create } from 'zustand';

interface SellerResetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSellerResetModal = create<SellerResetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));



export default useSellerResetModal;
