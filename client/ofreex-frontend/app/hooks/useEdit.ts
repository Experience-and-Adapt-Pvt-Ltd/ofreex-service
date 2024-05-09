import { create } from 'zustand';
import { SafeListing } from '../types';

interface EditProps {
  id?: string
  listing?: SafeListing
}
interface EditStore {
  obj: EditProps;
  onUpdate: (data: EditProps) => void;
}

export const useEdit = create<EditStore>((set) => ({
  obj: {},
  onUpdate: (data) => set({ obj: data }),
}));
