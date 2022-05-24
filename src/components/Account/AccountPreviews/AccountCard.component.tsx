import React, { Component } from "react";
import IBasePropsModel from "../../../models/base/IBaseProps.model";
import HeroCardModel from "../../../models/hero/HeroCard.model";
import AccountPreviewTemplate1Component from "./AccountPreview.template1.component";

export interface ICardProps extends IBasePropsModel {
  data: HeroCardModel;
}

export default class AccountCardComponent extends Component<ICardProps, any> {
  constructor(props: ICardProps) {
    super(props);
  }

  renderCard = () => {
    switch (this.props.data.previewTypeID) {
      case 1:
        return <AccountPreviewTemplate1Component data={this.props.data.item} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></AccountPreviewTemplate1Component>;

      default:
        return <></>;
    }
  };

  render() {
    return this.renderCard();
  }
}
