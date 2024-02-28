import React from 'react'
import { Avatar } from '@nextui-org/react'
import NavItems from '../NavItems'
import ProfileDropDown from '../ProfileDropDown'
import styles from '@/utils/style'

const Header = () => {
  return (
    <header className='w-full bg-[#0A0713] '>
        <div className='w-[90%] m-auto h-[80px] flex items-center justify-between'>
            <h1 className={`${styles.logo}`}>
                OfreeX
            </h1>
            <NavItems />
            <ProfileDropDown />
        </div>
      {/* <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /> */}
    </header>
  )
}

export default Header
