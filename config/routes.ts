export default [
  {
    path: '/login',
    layout: { hideMenu: true, hideNav: true, hideFooter: true },
    component: './Login',
  },
  { path: '/home', layout: { hideMenu: true }, component: './Home' },
  { path: '/detail/:artitleId', layout: { hideMenu: true }, component: './Article/detail' },
  { path: '/create', layout: { hideMenu: true }, component: './Article/create' },
  { path: '/q/:qId', layout: { hideMenu: true }, component: './Question/detail' },
  { path: '/u/:uId', layout: { hideMenu: true }, component: './Profile' },
  { path: '/im', component: './Im', layout: { hideMenu: true } },
  { path: '/im/chat', component: './Im/chat', layout: { hideMenu: true } },
  { path: '/welcome', name: 'welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: 'sub-page', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { path: '/', layout: { hideMenu: true }, component: './Home' },
  { component: './404' },
];
