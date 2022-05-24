import React, { Component } from "react";
import { Card, Col, Icon, Row } from "react-onsenui";
import IAccountCardPropModel from "../../../models/hero/IAccountCardProp.model";
import PreviewMetaModel from "../../../models/hero/PreviewMeta.model";

export default class AccountPreviewTemplate1Component extends Component<IAccountCardPropModel, any> {
  constructor(props: IAccountCardPropModel) {
    super(props);
  }

  renderMeta = () => {
    if (this.props.data.previewMeta.length === 0) {
      return <></>;
    }

    const columns = this.props.data.previewMeta.map((c: PreviewMetaModel, idx: number) => {
      const callIcon =
        c.callOutIconClass && c.callOutIconClass !== "" && c.callOutIconClass !== null ? (
          <div className="calloutBlock calloutIcon">
            <Icon icon={c.callOutIconClass}></Icon>
          </div>
        ) : (
          <></>
        );

      const callText = c.callOutText && c.callOutText !== "" && c.callOutText !== null ? <div className="calloutBlock calloutText">{c.callOutText}</div> : <></>;

      const callImg =
        c.callOutDataUrl && c.callOutDataUrl !== "" && c.callOutDataUrl !== null ? (
          <div className="calloutBlock calloutImg">
            <img src={c.callOutDataUrl} />
          </div>
        ) : (
          <></>
        );

      const displayName = c.displayName && c.displayName !== "" && c.displayName !== null ? <span className="preview-label">{c.displayName}</span> : <></>;
      const displayVal = c.displayValue && c.displayValue !== "" && c.displayValue !== null ? <span className="preview-value">{c.displayValue}</span> : <></>;
      return (
        <Col key={idx} className="meta-field" verticalAlign="center">
          {callIcon}
          {callText}
          {callImg}
          <div className="previewContainer">
            {displayName}
            {displayVal}
          </div>
        </Col>
      );
    });

    return <Row>{columns}</Row>;
  };

  render() {
    return (
      <Card className="accountCard">
        <div className="cardHeader">
          <div className="headerContainer">
            <div className="accountNameNumber">
              <span className="nick-name sub-title">{this.props.data.nickname}</span>
              <span className="card-number sub-title-alternate">
                <span>{this.props.data.accountNumber}</span>
              </span>
            </div>
            <div>
              <span className="balance-item">{this.props.data.balance}</span>
            </div>
          </div>
        </div>
        <div className="cardBody">{this.renderMeta()}</div>
      </Card>
    );
  }
}
