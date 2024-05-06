'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SafeCategory, SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import useEditModal from "../hooks/useEditModal";
import EditModal from "../components/modals/EditModal";
import { useEdit } from "../hooks/useEdit";
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
  console.log(searchParams?.get('verify'));
  return (
    <Container>
      <ResetModal verify={searchParams?.get('verify')} />
    </Container>
  );
}

export default ResetClient;