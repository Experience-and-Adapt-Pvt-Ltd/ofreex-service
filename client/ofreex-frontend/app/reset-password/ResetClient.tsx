'use client';

import { useSearchParams } from "next/navigation";
import Container from "@/app/components/Container";
import ResetModal from "../components/modals/ResetModal";
import useResetModal from "../hooks/useResetModal";

interface ResetClientProps {
}

const ResetClient: React.FC<ResetClientProps> = (
  verifyStr
) => {
  const resetModal = useResetModal();
  resetModal.isOpen = true;
  const searchParams = useSearchParams();
  return (
    <Container>
      <ResetModal verify={searchParams?.get('verify')} />
    </Container>
  );
}

export default ResetClient;