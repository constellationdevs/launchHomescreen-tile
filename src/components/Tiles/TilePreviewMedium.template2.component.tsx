import React, { Component } from "react";
import { Card } from "react-onsenui";
import ITilePropModel from "../../models/tile/ITileProp.model";

export default class TilePreviewTemplate2 extends Component<ITilePropModel, any> {
  constructor(props: ITilePropModel) {
    super(props);
  }

  render() {
    const cardStyle = {
      backgroundColor: `${this.props.data.HexColor}`,
    };

    const img =
      this.props.data.Image !== "" ? (
        <div className="imageContainer">
          <img src={this.props.data.Image} className="headeImage"></img>
        </div>
      ) : (
        <></>
      );

    return (
      <>
        <div className="cdpTile summaryCard">
          <div className="cdpCard">
            <Card className={this.props.data.ColorClass} style={cardStyle}>
              <div className="cardHeader">
                <div className={"headerContainer " + (this.props.data.Image === "" ? "noImage" : "")}>
                  <h1>{this.props.data.tileTitle}</h1>
                  <h2>{this.props.data.CallOut}</h2>
                  <h3>{this.props.data.Details1}</h3>
                  <h4>{this.props.data.Details2}</h4>
                </div>
                {img}
                <div className="openTile">
                  <i className="fa fa-2x fa-angle-right"></i>
                </div>
              </div>
              <div className="cardBody"></div>
            </Card>
          </div>
        </div>
      </>
    );
  }
}
