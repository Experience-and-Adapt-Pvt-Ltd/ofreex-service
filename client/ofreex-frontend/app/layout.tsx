import { Nunito } from "next/font/google";
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import ActivationModal from "./components/modals/ActivationModal";
import SellerModal from "./components/modals/SellerModel";
import BankDetailsModal from "./components/modals/BankDetailsModal";
import SellerActivationModal from "./components/modals/SellerActivationModal";
import getCurrentSeller from "./actions/getCurrentSeller";
import getCategories from "./actions/getCategories";
import SellerLoginModal from "./components/modals/SellerLoginModal";
import ForgetModal from "./components/modals/ForgetModal";
import SellerForgetModal from "./components/modals/SellerForgetModal";
import Footer from "./components/Footer";

export const metadata = {
  title: "OfreeX",
  description: "",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  //const currentSeller = await getCurrentSeller();
  const currentSeller = await getCurrentSeller();
  const categories = await getCategories();
  //const { activationToken, onUpdate } = useActivationToken();
  //const activationToken = "";
  //const { activationToken, setActivationToken } = getActivationStates();
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <ActivationModal />
          <SearchModal />
          <SellerModal />
          <SellerLoginModal />
          <BankDetailsModal />
          <SellerActivationModal />
          <ForgetModal />
          <SellerForgetModal />
          <Navbar
            currentUser={currentUser}
            currentSeller={currentSeller}
            categories={categories}
          />
          <div className="pb-20">{children}</div>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
