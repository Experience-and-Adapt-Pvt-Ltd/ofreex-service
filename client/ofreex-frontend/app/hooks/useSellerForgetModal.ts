import { create } from 'zustand';

interface SellerForgetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSellerForgetModal = create<SellerForgetModalStore>((set,get) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening forget modal");
      set({ isOpen: true });
  },
  onClose: () => {
    console.log("Closing forget modal");
      set({ isOpen: false });
  }
}));

export default useSellerForgetModal;
