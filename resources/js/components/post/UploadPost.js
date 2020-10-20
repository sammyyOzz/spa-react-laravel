import React, { Component } from 'react';
import axios, { post } from 'axios';

export default class FileUploadComponent extends Component
{
   constructor(props) {
      super(props);
      this.state ={
        caption: '',
        image: ''
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.onCaptionChange = this.onCaptionChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
      e.preventDefault()
      this.fileUpload(this.state.image);
    }
    onCaptionChange(e) {
        e.preventDefault()
        this.setState({
            caption: e.target.value
        })
    }
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0]);
    }
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          image: e.target.result
        })
      };
      reader.readAsDataURL(file);
    }
    fileUpload(image){
      const url = '/api/auth/p';
      const formData = {
        caption: this.state.caption,
        upload_file: this.state.image
      }
      const headers = { headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }}
      return  post(url, formData, headers)
              .then(response => console.log(response))
    }

   render()
   {
      return(

         <form onSubmit={this.onFormSubmit}>
        <h1>Upload an image</h1>
        <input type="text" onChange={this.onCaptionChange} />
        <input type="file"  onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      )
   }
}
