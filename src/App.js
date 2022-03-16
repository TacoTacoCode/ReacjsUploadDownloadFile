import axios from 'axios';
import React, { Component } from 'react';
import { saveAs } from 'file-saver'
class App extends Component {

  state = {

    // Initially, no file is selected 
    selectedFile: null
  };

  // On file select (from the pop up) 
  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button) 
  onFileUpload = async () => {
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    //formData.append('responseType', 'blob');
    console.log(this.state.selectedFile);
    axios.post("https://localhost:5001/uploadFile/product", formData)
      .then((response) => {
        if (response.data.includes('error')) {
          //chỗ này nên sinh ra 1 cái nút, popup báo người dùng là có record lỗi
          //rồi người ta bấm vô mới gọi lệnh dưới cho down về
          axios({
            url: 'https://localhost:5001/downloadFile?name='+response.data,
            responseType: 'blob',
            method: 'GET',
          }).then((resp) => {
              saveAs(resp.data,'error.xlsx')
            })
        } else {
          //ko có gì thì ko hiện poppup thôi
          console.log('false')
        }

      })

  };

  // File content to be displayed after 
  // file upload is complete 
  fileData = () => {
    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>
          GeeksforGeeks
        </h1>
        <h3>
          File Upload using React!
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App; 
