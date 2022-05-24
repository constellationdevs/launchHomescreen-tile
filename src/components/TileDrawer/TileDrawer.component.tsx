import React from "react";
import { Component } from "react";
import { Button, Icon } from "react-onsenui";
import IBasePropsModel from "../../models/base/IBaseProps.model";
import AllAvailableTilesModel from "../../models/CDP/AllAvailableTiles.model";
import ContainerTileModel from "../../models/CDP/ContainerTile.model";
import TileModel from "../../models/tile/Tile.model";
import TileComponentModel from "../../models/tile/TileComponent.model";
import container from "../../services/container.svc";
import { ProcessCDPComponent } from "../../services/helper.svc";
import TileComponent from "../Tiles/Tile.component";

export interface ITileDrawerState {
  loading: boolean;
}
export interface ITileDrawerProps extends IBasePropsModel {
  component: TileComponentModel;
}

export default class TileDrawer extends Component<ITileDrawerProps, ITileDrawerState> {
  tileList: TileModel[];

  constructor(props: ITileDrawerProps) {
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
        container.tiles.allAvailable("", (containerResp: AllAvailableTilesModel) => {
      
          this.tileList = containerResp.data.tiles.map((t: ContainerTileModel) => new TileModel(t.Title, t.TileCode, t.TileVersion, t.Icon, t.Connectors));
          this.setState({ loading: false });
        });
      },
      () => {
        console.error("Failed to get tile drawer data");
      }
    );
  };

  public renderLoading() {
    return <div id="tmpTiles" className="loading"></div>;
  }

  public render() {
    if (this.state.loading) {
      return this.renderLoading();
    }

    const myTiles = this.tileList.map((val: TileModel, idx: number) => <TileComponent key={idx} data={val} tileConfig={this.props.tileConfig} navigator={this.props.navigator}></TileComponent>);

    return (
      <>
        <div id="tmpTiles">
          <div id="TilesHeaderContainer">
            <span>My Tiles</span>
            <Button>
              <Icon icon="fa-plus"></Icon>
            </Button>
          </div>
          <div id="homeTiles" className="tileContainer">
            {myTiles}
          </div>
        </div>
      </>
    );
  }
}
