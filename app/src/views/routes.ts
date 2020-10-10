const routes: RouteConfig[] = [
  {
    key: 'Home',
    path: '/',
    redirect: { to: '/demo?form=home' },
    windowOptions: {
      title: '清除excel特殊字符工具',
      width: 750,
      height: 400,
      maxWidth: 750,
      maxHeight: 400,
    },
    createConfig: {
      showSidebar: true,
      hideMenus: true,
      saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
