import React, { Component } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class FileUploader extends Component {
    constructor(props) {
        super();

        this.fileUpload = this.fileUpload.bind(this);
    }

    fileUpload = (fileItems) => {
        let file = null;

        if (fileItems.length) {
            file = fileItems[0].file;
        }

        this.props.upload(file);
    }

    render() {
        return (
            <>
                <div>{this.props.label} <span style={{ fontSize: 14, color: 'gray' }}>{`(< 5 MB)`}</span></div>
                <FilePond ref={ref => (this.pond = ref)}
                    allowMultiple={false}
                    onupdatefiles={fileItems => this.fileUpload(fileItems)} />
            </>
        )
    }
}

export default FileUploader;
