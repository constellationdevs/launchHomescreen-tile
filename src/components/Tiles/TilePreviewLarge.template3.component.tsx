import React, { Component } from "react";
import { Card, List, ListItem } from "react-onsenui";
import ITilePropModel from "../../models/tile/ITileProp.model";
import TileSummaryListItemModel from "../../models/tile/TileSummaryListItem.model";

export default class TilePreviewTemplate3 extends Component<ITilePropModel, any> {
  constructor(props: ITilePropModel) {
    super(props);
  }

  renderRow = (row: TileSummaryListItemModel, idx: number) => {
    const img =
      row.Image1 !== "" ? (
        <div className="left list--noborder">
          <img src={row.Image1} className="list-item__thumbnail"></img>
        </div>
      ) : (
        <></>
      );

    const showCallout1 = row.CallOut1 !== "" || row.CallOut1Icon !== "";
    const showCallout2 = row.CallOut2 !== "" || row.CallOut2Icon !== "";

    const callouts =
      showCallout1 && showCallout2 ? (
        <div className="right list--noborder" style={{ display: "flex", flexFlow: "column" }}>
          {showCallout1 ? (
            <div className="calloutContainer">
              {row.CallOut1Icon !== "" ? <img src={row.CallOut1Icon} className="list-item__thumbnail" /> : <></>}
              {row.CallOut1 !== "" ? <span className="list-item__title">{row.CallOut1}</span> : <></>}
            </div>
          ) : (
            <></>
          )}
          {showCallout2 ? (
            <div className="calloutContainer">
              {row.CallOut2Icon !== "" ? <img src={row.CallOut2Icon} className="list-item__thumbnail" /> : <></>}
              {row.CallOut2 !== "" ? <span className="list-item__title">{row.CallOut2}</span> : <></>}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>        
          {showCallout1 ? (
            <div className="right list--noboarder">
              {row.CallOut1Icon !== "" ? <img src={row.CallOut1Icon} className="list-item__thumbnail" /> : <></>}
              {row.CallOut1 !== "" ? <span className="list-item__title">{row.CallOut1}</span> : <></>}
            </div>
          ) : (
            <></>
          )}
        </>
      );

    return (
      <ListItem key={idx}>
        {img}
        <div className="center list--noborder">
          <span className="list-item__title">{row.Title}</span>
          <span className="list-item__subtitle">{row.Detail}</span>
        </div>
        {callouts}
      </ListItem>
    );
  };

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
        <div className="cdpTile summarylistCard">
          <div className="cdpCard">
            <Card  className={this.props.data.ColorClass} style={cardStyle}>
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
              <div className="cardBody">
                <List dataSource={this.props.data.Transactions} renderRow={(row: TileSummaryListItemModel, idx: number) => this.renderRow(row, idx)}></List>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }
}
