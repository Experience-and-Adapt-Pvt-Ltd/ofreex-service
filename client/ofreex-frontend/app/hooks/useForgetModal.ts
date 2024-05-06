import { create } from 'zustand';

interface ForgetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ForgetModalModal = create<ForgetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));



export default ForgetModalModal;
