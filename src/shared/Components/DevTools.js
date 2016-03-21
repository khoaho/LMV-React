
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'
import { createDevTools } from 'redux-devtools'
import React from 'react'

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w">
    <LogMonitor />
  </DockMonitor>
)
