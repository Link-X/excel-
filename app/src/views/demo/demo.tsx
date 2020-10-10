import * as React from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { ipcRenderer } from 'electron'

import './index.less'

const { Dragger } = Upload
export default class Demo extends React.Component<any, any> {
  // state 初始化j
  state = {}

  beforeUpload = (file: any, FileList: any[]): any => {
    ipcRenderer.send('fileSend', file.path)
  }

  componentDidMount() {
    ipcRenderer.removeAllListeners('saveSuccess')
    ipcRenderer.on('saveSuccess', () => {
      message.success('保存成功', 3)
    })
  }

  render(): JSX.Element {
    return (
      <div className="layout-padding">
        <Dragger
          name="file"
          accept=".xls, .xlsx"
          showUploadList={false}
          multiple={false}
          beforeUpload={this.beforeUpload}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">请点击或拖拽上传文件</p>
          <p className="ant-upload-hint">
            程序将自动去除表格中的乱码或特殊字符，仅支持excel文件，并且内容符合标准
          </p>
        </Dragger>
        <div className="tip">版权所有：许道斌</div>
      </div>
    )
  }
}
