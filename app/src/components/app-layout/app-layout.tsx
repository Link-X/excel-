import React from 'react'
import $c from 'classnames'

import { AppTitlebar, AppSidebar, makeDraggableFallback } from '../'

import './app-layout.less'

interface AppLayoutProps {
  createConfig: CreateConfig
  children: any
}

export class AppLayout extends React.Component<AppLayoutProps> {
  componentDidMount() {
    setTimeout(() => {
      makeDraggableFallback('#header-drag')
    }, 1500)
  }

  render(): JSX.Element {
    const { createConfig } = this.props
    return (
      <div className={$c('app-layout flex', { 'has-titlebar': createConfig.showTitlebar }, process.platform)}>
        {createConfig.showSidebar ? <AppSidebar /> : null}
        <div className="flex-1 app-content-wrap">
          <div className="header-drag" id="header-drag">
            <div
              className="cloase"
              onClick={() => {
                window.close()
              }}
            >
              ×
            </div>
          </div>
          {/* {createConfig.showTitlebar ? <AppTitlebar /> : null} */}
          <div className="app-content">{this.props.children}</div>
        </div>
      </div>
    )
  }
} // class AppLayout end
