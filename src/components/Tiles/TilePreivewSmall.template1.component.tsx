import React from "react";
import { Component } from "react";
import { Card } from "react-onsenui";
import ITilePropModel from "../../models/tile/ITileProp.model";




export default class TilePreviewTemplate1 extends Component<ITilePropModel, any> {
  constructor(props: ITilePropModel) {
    super(props);
  }

  render() {
    const headerStyle = {
      background: `url(${this.props.data.tileIcon}) 50% / 50% auto no-repeat`
    };
    const cardStyle = {
      backgroundColor: `${this.props.data.HexColor}`
    };
    return (
      <>
        <div className="cdpTile iconCard">
          <div className="cdpCard">
            <Card className={this.props.data.ColorClass} style={cardStyle}>
              <div className="cardHeader" style={headerStyle}></div>
              <div className="cardBody">
                <h1>{this.props.data.tileTitle}</h1>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }
}
