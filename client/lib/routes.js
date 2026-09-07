export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    WISHLIST: "/user/wishlist",
    CART: "/user/cart",
    BULK_ORDERS: "/bulk-orders",
    PRODUCT_CATEGORIES: "/productcategories",
    COLLECTIONS: "/collections",
    PRODUCT: "/product",
    PROFILE: "/user/profile",
    CHECKOUT: "/user/checkout",
    PAYMENT_STATUS: "/user/payment/status",
    ABOUT: "/about",
    ARTISANS: "/artisans",
    IMPACT: "/impact",
    CONTACT: "/contact",
    SHIPPING: "/shipping",
    PRIVACY: "/privacy",
    TERMS: "/terms",
    SEARCH: "/search",
    ARCHIVE: "/archive",
};

export const NAV_LINKS = [
    {
        name: "Modular Kitchen",
        href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen`,
        children: [
            { name: "Pantry Pull-Outs", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/pantry-pull-outs` },
            { name: "Kitchen Baskets", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/kitchen-baskets` },
            { name: "Cutlery Holders / Stands", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/cutlery-holders-stands` },
            { name: "Plate Stands", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/plate-stands` },
            { name: "Bottle Racks", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/bottle-racks` },
            { name: "Spice Racks", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/spice-racks` },
            { name: "Cylinder Trolleys", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/cylinder-trolleys` },
            { name: "Rolling-Pin Holders", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/rolling-pin-holders` },
            { name: "Corner Units & Magic Corners", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/corner-units` },
            { name: "Waste Bins", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/waste-bins` },
            { name: "Multipurpose Baskets", href: `${ROUTES.PRODUCT_CATEGORIES}/modular-kitchen/multipurpose-baskets` }
        ]
    },
    {
        name: "Kitchen Storage",
        href: `${ROUTES.PRODUCT_CATEGORIES}/kitchen-storage`,
        children: [
            { name: "Modular Shelves", href: `${ROUTES.PRODUCT_CATEGORIES}/kitchen-storage/shelves` },
            { name: "Kitchen Organizers", href: `${ROUTES.PRODUCT_CATEGORIES}/kitchen-storage/organizers` },
            { name: "Serving & Utility Trays", href: `${ROUTES.PRODUCT_CATEGORIES}/kitchen-storage/trays` },
            { name: "Pull-Out Systems", href: `${ROUTES.PRODUCT_CATEGORIES}/kitchen-storage/pull-out-systems` },
            { name: "Magic Corners", href: `${ROUTES.PRODUCT_CATEGORIES}/kitchen-storage/magic-corners` }
        ]
    },
    {
        name: "Tabletop & Cutlery",
        href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery`,
        children: [
            { name: "Spoon Stands", href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery/spoon-stands` },
            { name: "Cup Holders", href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery/cup-holders` },
            { name: "Cup Stands", href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery/cup-stands` },
            { name: "Napkin Holders", href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery/napkin-holders` },
            { name: "Cutlery Stands", href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery/cutlery-stands` },
            { name: "Bowls and Stands", href: `${ROUTES.PRODUCT_CATEGORIES}/tabletop-cutlery/bowls-and-stands` }
        ]
    },
    {
        name: "Bathroom Fixtures",
        href: `${ROUTES.PRODUCT_CATEGORIES}/bathroom-fixtures`,
        children: [
            { name: "Towel Racks & Bars", href: `${ROUTES.PRODUCT_CATEGORIES}/bathroom-fixtures/towel-racks` },
            { name: "Shower Corner Caddies", href: `${ROUTES.PRODUCT_CATEGORIES}/bathroom-fixtures/corner-caddies` },
            { name: "Soap & Tumbler Holders", href: `${ROUTES.PRODUCT_CATEGORIES}/bathroom-fixtures/soap-holders` },
            { name: "Robe & Towel Hooks", href: `${ROUTES.PRODUCT_CATEGORIES}/bathroom-fixtures/robe-hooks` }
        ]
    },
    {
        name: "Wardrobe Accessories",
        href: `${ROUTES.PRODUCT_CATEGORIES}/wardrobe-accessories`,
        children: [
            { name: "Stainless-Steel Wardrobe Racks", href: `${ROUTES.PRODUCT_CATEGORIES}/wardrobe-accessories/wardrobe-racks` },
            { name: "Trouser & Tie Organizers", href: `${ROUTES.PRODUCT_CATEGORIES}/wardrobe-accessories/trouser-organizers` },
            { name: "Storage / Organizing Accessories", href: `${ROUTES.PRODUCT_CATEGORIES}/wardrobe-accessories/storage-accessories` }
        ]
    },
    {
        name: "Wire Products",
        href: `${ROUTES.PRODUCT_CATEGORIES}/wire-products`,
        children: [
            { name: "Heavy-Duty Wire Racks", href: `${ROUTES.PRODUCT_CATEGORIES}/wire-products/wire-racks` },
            { name: "Wire Organizers", href: `${ROUTES.PRODUCT_CATEGORIES}/wire-products/wire-organizers` },
            { name: "Utility Wire Baskets", href: `${ROUTES.PRODUCT_CATEGORIES}/wire-products/utility-wire-baskets` }
        ]
    }
];
