import React, { Component } from "react";
import { Card } from "react-onsenui";
import IBasePropsModel from "../../models/base/IBaseProps.model";
import ContainerResponseModel from "../../models/CDP/ContainerResponse.model";
import TileModel from "../../models/tile/Tile.model";
import TilePreviewEnum from "../../models/tile/TilePreview.enum";
import TileSummaryModel from "../../models/tile/TileSummary.model";
import container from "../../services/container.svc";
import TilePreviewTemplate1 from "./TilePreivewSmall.template1.component";
import TilePreviewTemplate3 from "./TilePreviewLarge.template3.component";
import TilePreviewTemplate2 from "./TilePreviewMedium.template2.component";
import AccountWidget from "../Account/AccountPreviews/AccountWidget.component";


export interface ITileProp extends IBasePropsModel {
  data: TileModel;
}

export interface ITileState {
  isLoading: boolean;
}

export default class TileComponent extends Component<ITileProp, ITileState> {
  TileData: TileSummaryModel;

  public constructor(props: ITileProp) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.componentInit();
  }

  componentInit = () => {
    // check for a tile summary connector
    const ts = new TileSummaryModel();

    if (this.props.data.hasTileSummaryMethod) {
      this.getTileSummary().then(
        (x: TileSummaryModel) => {
        
          if (x === undefined){
            this.TileData = ts.createTileSummaryModel(this.props.data, ts);
          } else{
            this.TileData = ts.createTileSummaryModel(this.props.data, x);
          }
          
          this.setState({ isLoading: false });
        },
        (x: any) => {
          console.error("Failed TS", x);

          this.TileData = ts.createTileSummaryModel(this.props.data, ts);
          this.setState({ isLoading: false });
        }
      );
    } else {
      this.TileData = ts.createTileSummaryModel(this.props.data, ts);
      this.setState({ isLoading: false });
    }
  };

  getTileSummary = (): Promise<TileSummaryModel> => {
    return new Promise<any>((resolve, reject) => {
      container.connectors.sendRequest(this.props.data.connectorName, this.props.data.connectorVersion, "TileSummary", {}, (resp: ContainerResponseModel) => {       
        if (resp.success) {     
          const ts: TileSummaryModel = resp.data;
          resolve(ts);
        } else {
          reject("");
        }
      });
    });
  };

  renderTile = () => {
    switch (this.TileData.previewTemplate) {
      case TilePreviewEnum.Icon:
        return <TilePreviewTemplate1 data={this.TileData} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></TilePreviewTemplate1>;
      case TilePreviewEnum.Summary:
        return <TilePreviewTemplate2 data={this.TileData} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></TilePreviewTemplate2>;
      case TilePreviewEnum.SummaryList:
        return <TilePreviewTemplate3 data={this.TileData} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></TilePreviewTemplate3>;
      case TilePreviewEnum.Widget:
        return <AccountWidget></AccountWidget>
      default:
        return <TilePreviewTemplate1 data={this.TileData} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></TilePreviewTemplate1>;
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="cdpTile iconCard">
          <div className="cdpCard loader">
            <Card></Card>
          </div>
        </div>
      );
    } else {
      return this.renderTile();
    }
  }
}
