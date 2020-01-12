export interface MenuItem {
  path: string;
  icon?: string;
  title: string;
}

export interface MenuGroup {
  icon?: string;
  title: string;
  children?: MenuItem[];
}

export interface MenuConfig {
  path: string;
  icon: string;
  title: string;
  groups?: MenuGroup[];
  children: MenuItem[];
}
