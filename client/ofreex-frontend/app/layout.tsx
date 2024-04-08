
import { Nunito } from 'next/font/google'
import { useActivationToken } from './hooks/useActivationToken';
import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import ActivationModal from './components/modals/ActivationModal';
import SellerModal from './components/modals/SellerModel';
import BankDetailsModal from './components/modals/BankDetailsModal';
import SellerActivationModal from './components/modals/SellerActivationModal';
import getCurrentSeller from './actions/getCurrentSeller';
import getCategories from './actions/getCategories';


export const metadata = {
  title: 'OfreeX',
  description: '',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const currentSeller = await getCurrentSeller();
  const categories = await getCategories();
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <ActivationModal />
          <SearchModal />
          <RentModal />
          <SellerModal />
          <BankDetailsModal />
          <SellerActivationModal />
          <Navbar currentUser={currentUser} currentSeller={currentSeller} categories={categories} />
        </ClientOnly>
        <div className="pb-20">
          {children}
        </div>
      </body>
    </html>
  )
}
