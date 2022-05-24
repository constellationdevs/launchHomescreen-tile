import React from "react";
import { Component } from "react";
import IBasePropsModel from "../../models/base/IBaseProps.model";
import HeroCardModel from "../../models/hero/HeroCard.model";
import HeroComponentAccountModel from "../../models/hero/HeroComponentAccount.model";
import { isNativeApp, ProcessCDPComponent } from "../../services/helper.svc";
import AccountCardComponent from "../Account/AccountPreviews/AccountCard.component";

export interface IHeroState {
  loading: boolean;
}
export interface IHeroProps extends IBasePropsModel {
  component: HeroComponentAccountModel;
}

export default class HeroComponent extends Component<IHeroProps, IHeroState> {
  cardList: HeroCardModel[];

  constructor(props: IHeroProps) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.componentInit();
  }

  componentInit = () => {
    ProcessCDPComponent(this.props.component).then(
      (response: any) => {
        this.cardList = response;
        this.setState({ loading: false });
      },
      () => {
        console.error("Failed to get hero data");
      }
    );
  };

  renderCards = () => {    
    return this.cardList.map((val: HeroCardModel, idx: number) => <AccountCardComponent key={idx} data={val} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></AccountCardComponent>);
  };

  renderLoading() {
    return <div id="tmpHero" className="loading"></div>;
  }

  // desktop structure of the hero section
  renderDesktop = () => {
    return (
      <div id="tmpHero">
        <div id="acctContainer" className="desktop">
          <div className="acctList">{this.renderCards()}</div>
        </div>
      </div>
    );
  };

  // native app structure of the hero section
  renderNativeApp = () => {
    return (
      <div id="tmpHero">
        <div id="acctContainer" className="native">
          <div className="acctList">{this.renderCards()}</div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else {
      if (isNativeApp()) {
        return this.renderNativeApp();
      } else {
        return this.renderDesktop();
      }
    }
  }
}
