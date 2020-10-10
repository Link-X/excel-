import React from 'react'
import { Tooltip } from 'antd'

import AppSideMenus from './side-menus.json'
import './app-sidebar.less'

interface SideMenuItem {
  key: string
  href: string
  title: string
  icon: string
}

interface State {
  activeMenuKey: string
}

export function makeDraggableFallback(name: string) {
  const Drag = require('electron-drag')
  if (Drag && Drag.supported) {
    Drag(name)
    return
  }
  let dragging = false
  let mouseX = 0
  let mouseY = 0
  const el = document.querySelector(name)
  el.addEventListener('mousedown', (e) => {
    dragging = true
    const { pageX, pageY } = e as any
    mouseX = pageX
    mouseY = pageY
  })
  window.addEventListener('mouseup', () => {
    dragging = false
  })
  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (dragging) {
      const { pageX, pageY } = e
      const win = require('electron').remote.getCurrentWindow()
      const pos = win.getPosition()
      pos[0] = pos[0] + pageX - mouseX
      pos[1] = pos[1] + pageY - mouseY
      win.setPosition(pos[0], pos[1], true)
    }
  })
}

export class AppSidebar extends React.Component<unknown, State> {
  state: State = {
    activeMenuKey: AppSideMenus[0]?.key,
  }

  componentDidMount(): void {
    window.addEventListener('router_update', (e: any) => {
      const routeProps: PageProps = e.detail
      this.setState({ activeMenuKey: routeProps.name })
    })
    setTimeout(() => {
      console.log($tools)
      makeDraggableFallback('#sidebar-dom')
    }, 1500)
  }

  render(): JSX.Element {
    return (
      <div className="app-sidebar" id="sidebar-dom">
        {/* <div className="mt-24 flex center app-sidebar-header">
          <img width="40" src={$tools.APP_ICON} />
        </div> */}

        <div className="flex column side-menu">{AppSideMenus.map(this.renderMenuItem)}</div>
      </div>
    )
  }

  renderMenuItem = ({ key, icon, title, href }: SideMenuItem): JSX.Element => {
    const { activeMenuKey } = this.state
    const isActive = activeMenuKey === key
    // const iconProps: IconProps = { type: icon, className: 'fs-24' }
    // if (activeMenuKey === key) {
    //   iconProps.theme = 'filled'
    //   iconProps.style = { color: '#fff' }
    // }
    return (
      <Tooltip key={key} overlayClassName="side-menu-item-tooltip" placement="right" title={title}>
        <a
          className={`side-menu-item fs-24 ri-${icon}-${isActive ? 'fill' : 'line'}`}
          style={{ color: isActive ? '#fff' : '' }}
          href={href}
        ></a>
      </Tooltip>
    )
  }
} // class AppSidebar end
