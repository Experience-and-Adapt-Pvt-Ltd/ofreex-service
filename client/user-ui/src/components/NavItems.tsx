import Link from "next/link"

const navItems = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Products",
        url: "/products"
    },
    {
        title: "Contact Us",
        url: "/contact"
    }
]

const NavItems = ({activeItem = 0}: {activeItem?:number}) => {
  return (
    <div>
      {
        navItems.map((items,index)=>(
            <Link
            key={items.url}
            href={items.url}
            className={`px-5 text-[18px] font-mono font-[500] 
            ${activeItem === index && "text-[#37b668]"}
            `}>
                {items.title}
            </Link>
        ))
      }
    </div>
  )
}

export default NavItems
