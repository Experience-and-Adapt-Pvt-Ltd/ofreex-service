'use client';

import { useSearchParams } from "next/navigation";
import Container from "@/app/components/Container";
import SellerResetModal from "../components/modals/SellerRestModal";
import useSellerResetModal from "../hooks/useSellerResetModal";

interface ResetClientProps {
}

const SellerResetClient: React.FC<ResetClientProps> = (
  verifyStr
) => {
  const resetModal = useSellerResetModal();
  resetModal.isOpen = true;
  const searchParams = useSearchParams();
  console.log(searchParams?.get('verify'));
  return (
    <Container>
      <SellerResetModal verify={searchParams?.get('verify')}/>
    </Container>
  );
}

export default SellerResetClient;