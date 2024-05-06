import ClientOnly from "@/app/components/ClientOnly";
import ResetClient from "./ResetClient";

const ResetPage = async () => {

  return (
    <ClientOnly>
      <ResetClient />
    </ClientOnly>
  );
}

export default ResetPage;
