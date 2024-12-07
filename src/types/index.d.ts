const timePeriod = [
  "lastHour",
  "last24Hours",
  "last7Days",
  "last30Days",
] as const;

export type TimePeriod = (typeof timePeriod)[number];

export type SiteConfig = {
  name: string;
  description: string;
  // url: string;
  // ogImage: string;
  links: {
    facebook: string;
    instagram: string;
    tiktok: string;
    asii: string;
    fii: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type LandingConfig = {
  mainNav: MainNavItem[];
};
