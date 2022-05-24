import React, { Component } from "react";
import { Page } from "react-onsenui";
import HeaderToolbar from "../components/Toolbar/HeaderToolbar1.component";
import IBasePropsModel from "../models/base/IBaseProps.model";
import ComponentModel from "../models/Component.model";
import HomePageComponentModel from "../models/HomePageComponent.model";

import TileComponentModel from "../models/tile/TileComponent.model";
import HomePageTemplate1 from "./PageTemplates/HomePage.Template1";

export interface IHomePageProps extends IBasePropsModel {
  componentModel: HomePageComponentModel;
 
}

export default class HomePage extends Component<IHomePageProps, any> {
  heroComponent: ComponentModel;
  tileComponent: TileComponentModel;

  constructor(props: IHomePageProps) {
    super(props);

 

  }



  toolbar = () => {
    return <HeaderToolbar />;
  };

  renderPageTemplate = () => {
    switch (this.props.componentModel.templateID) {
      case 1:
        return <HomePageTemplate1 key="HomePageTemplate1" componentModel={this.props.componentModel} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></HomePageTemplate1>;

      default:
        return <></>;
    }
  };

  render() {
    return (
      <Page key="homePage" id="homePage" renderToolbar={this.toolbar}>
        {this.renderPageTemplate()}
      </Page>
    );
  }
}
