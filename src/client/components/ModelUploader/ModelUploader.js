import ModelUploaderAPI from './ModelUploader.API'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import './ModelUploader.scss'
import React from 'react'

export default class ModelUploader extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.api = new ModelUploaderAPI(this.props.apiUrl)

    this.onDrop = this.onDrop.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  guid (format = 'xxxxxxxxxx') {

    var d = new Date().getTime()

    var guid = format.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
      })

    return guid
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onDrop (files) {

    const uploadId = this.guid()

    const file = files[0]

    const options = {
      progress: (percent) => {

        if (this.props.onProgress) {

          this.props.onProgress({
            uploadId,
            percent,
            file
          })
        }
      },
      data: {
        socketId: this.props.socketId,
        uploadId
      }
    }

    if (this.props.onInitUpload) {

      this.props.onInitUpload({
        uploadId,
        file
      })
    }

    this.api.upload(file, options)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return(
      <div className="model-uploader">
        <Dropzone className="drop-target"
          onDrop={this.onDrop}
          multiple={false} >
          <p>
            Drop a file here or click to browse ...
          </p>
        </Dropzone>
      </div>
    )
  }
}
