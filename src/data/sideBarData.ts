export type SideBarType = {
  path: string;
  title: string;
  icon: any;
  code: string;
};

const sidebarData: SideBarType[] = [
  { path: '/about', title: 'About Me', icon: 'home-about', code: 'about' },
  { path: '/work', title: 'My Work', icon: 'home-work', code: 'work' },
  {
    path: '/skills',
    title: 'Technical Skills',
    icon: 'home-skills',
    code: 'skills',
  },
  { path: '/hobby', title: 'Hobby', icon: 'home-hobby', code: 'hobby' },
];

export default sidebarData;
