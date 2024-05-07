import ClientOnly from "@/app/components/ClientOnly";
import SellerResetClient from "./ResetSeller";


const SellerResetPage = async () => {

  return (
    <ClientOnly>
      <SellerResetClient />
    </ClientOnly>
  );
}

export default SellerResetPage;
