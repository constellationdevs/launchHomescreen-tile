import React, { Component } from "react";
import HeroComponent from "../../components/Hero/Hero.component";
import TileDrawer from "../../components/TileDrawer/TileDrawer.component";
import IBasePropsModel from "../../models/base/IBaseProps.model";
import HeroComponentAccountModel from "../../models/hero/HeroComponentAccount.model";
import TileComponentModel from "../../models/tile/TileComponent.model";

export interface IHomePageTemplateProps extends IBasePropsModel {
  //  Hero: any;
  //  TileDrawer: TileComponentModel;
  componentModel: any;
}

export default class HomePageTemplate2 extends Component<IHomePageTemplateProps, any> {
  heroComponent: HeroComponentAccountModel;
  tileDrawer: TileComponentModel;
  constructor(props: IHomePageTemplateProps) {
    super(props);

    this.heroComponent = this.props.componentModel.data.Hero;
    this.tileDrawer = this.props.componentModel.data.TileDrawer;
  }

  renderHero = () => {
    switch (this.heroComponent.templateID) {
      case 1:
        return <HeroComponent tileConfig={this.props.tileConfig} navigator={this.props.navigator} component={this.heroComponent}></HeroComponent>;

      default:
        return <></>;
    }
  };

  renderTileDrawer = () => {
    switch (this.tileDrawer.templateID) {
      case 1:
        return <TileDrawer tileConfig={this.props.tileConfig} navigator={this.props.navigator} component={this.tileDrawer}></TileDrawer>;

      default:
        return <></>;
    }
  };

  render() {
    return (
      <div className="cdp_page_container">
        <div className="cdp_hero">
          {/*{this.renderHero()}*/}
        </div>

        <div className="cdp_list_container">{this.renderTileDrawer()}</div>
      </div>
    );
  }
}
