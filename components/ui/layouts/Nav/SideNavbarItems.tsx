import { SideNavItem } from "@/@types/enum";
import { Icon } from "@iconify/react";



const NAV_ITEMS: SideNavItem[] = [
    {
        title: "Home",
        path: "/",
        icon: <Icon icon="lucide:home" width="24" height="24" />,
        current: true,
    },
    {
        title: "Product",
        path: "/me/product",
        icon: <Icon icon="gg:menu-round" width="24" height="24" />,
        current: false,

    },
    {
        title: "About",
        path: "/me/enquires",
        icon: <Icon icon="lucide:settings" width="24" height="24" />,
        current: false,

    },
    {
        title: "Mission",
        path: "/me/mission",
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
        current: false,
    },
    {
        title: "Login",
        path: "",
        icon: <Icon icon="material-symbols:login" width="24" height="24" />,
        current: false,
    },
    {
        title: "Register",
        path: "",
        icon: <Icon icon="mdi:register" width="24" height="24" />,
        current: false,
    },


];
export default NAV_ITEMS;

export const NAV_LINKS = [
    { href: "/", key: "home", label: "Home", current: true },
    { href: "/", key: "Menu", label: "Menu", current: false },
    { href: "/stats", key: "About", label: "About", current: false },
    { href: "/", key: "contact", label: "contact", current: false },
];

export const menuItem = [

    {
        id: '1',
        image: '/Assets/sallad1.png',
        itemName: 'Margherita Pizza',
        basePrice: '9.99',
        Description: 'Classic pizza with tomato sauce, fresh mozzarella cheese, and basil leaves.'
    },
    {
        id: '2',
        image: '/Assets/sallad1.png',
        itemName: 'Margherita Pizza',
        basePrice: '9.99',
        Description: 'Classic pizza with tomato sauce, fresh mozzarella cheese, and basil leaves.'
    }, {
        id: '3',
        image: '/Assets/sallad1.png',
        itemName: 'Margherita Pizza',
        basePrice: '9.99',
        Description: 'Classic pizza with tomato sauce, fresh mozzarella cheese, and basil leaves.'
    }
];