export const siteConfig = {
  name: 'Summit Auto Group',
  shortName: 'AUTONEXA',
  tagline: 'Exceptional Cars. Exceptional Experience.',
  description: "We're more than a dealership. We're your automotive partner for life.",
  contact: {
    address: '2500 West Loop South, Houston, TX 77027',
    phone: '(713) 555-0198',
    phoneRaw: '7135550198',
    email: 'info@summitautogroup.com',
    hours: {
      sales: {
        weekdays: 'Mon - Sat: 9:00 AM - 7:00 PM',
        sunday: 'Sunday: Closed',
        shortWeekday: 'Mon - Sat 9am - 7pm'
      },
      service: {
        weekdays: 'Mon - Sat: 7:00 AM - 6:00 PM',
        sunday: 'Sunday: Closed',
        shortWeekday: 'Mon - Sat 7am - 6pm'
      }
    }
  },
  socialLinks: {
    facebook: '#facebook',
    instagram: '#instagram',
    youtube: '#youtube',
    tiktok: '#tiktok'
  },
  navLinks: [
    { label: 'HOME', path: '/' },
    { label: 'INVENTORY', path: '/inventory' },
    { label: 'SHOP BY TYPE', path: '/inventory', dropdown: true },
    { label: 'FINANCING', path: '/financing' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'CONTACT', path: '/contact' }
  ],
  footerLinks: [
    { label: 'Inventory', path: '/inventory' },
    { label: 'Shop by Type', path: '/inventory' },
    { label: 'Financing', path: '/financing' },
    { label: 'Specials', path: '/inventory' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ]
};
