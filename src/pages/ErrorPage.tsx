import React, { Component } from 'react';
import { Page, Icon } from 'react-onsenui';
import IBaseStateModel from '../models/base/IBaseState.model';

class ErrorPage extends Component<any, IBaseStateModel> {
  state = {
    componentModel: {}
  };


  render() {
    
    return (
      <Page key="ErrorPage" id="ErrorPage">
        <div id="errorPageContainer" onClick={this.refresh}>
          <div id="errorMsg">
            <span>Oops! Something went wrong.</span>
            <br />
            <br />
            <span>Tap to refresh</span>
            <br />
            <br />
            <Icon icon={{ default: "fa-refresh" }}> </Icon>
          </div>
        </div>
      </Page>
    );
  }

  refresh = () => {
   
    window.location.reload();
  }
}

export default ErrorPage;