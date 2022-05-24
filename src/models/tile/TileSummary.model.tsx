import TileModel from "./Tile.model";
import TileColorModel from "./TileColor.model";
import TilePreviewEnum from "./TilePreview.enum";
import TileSummaryListItemModel from "./TileSummaryListItem.model";
export default class TileSummaryModel {
  // from TileSummary connector call
  PreviewTypes: string[];
  PreviewDefault: string;
  TileData: string;
  BackgroundColor: TileColorModel;
  CallOut: string;
  Details1: string;
  Details2: string;
  Image: string;
  Transactions: TileSummaryListItemModel[];

  // from container tile
  tileIcon: string;
  tileTitle: string;
  tileCode: string;
  tileVersion: string;
  connectorName: string;
  connectorVersion: string;
  hasTileSummaryMethod: boolean;
  previewTemplate: TilePreviewEnum;

  // custom fields
  HexColor: string;
  ColorClass: string;

  createTileSummaryModel = (containerTile: TileModel, summaryModel: TileSummaryModel): TileSummaryModel => {
  
    // add fields from tile
    summaryModel.tileTitle = containerTile.tileTitle;
    summaryModel.tileCode = containerTile.tileCode;
    summaryModel.tileVersion = containerTile.tileVersion;
    summaryModel.connectorName = containerTile.connectorName;
    summaryModel.connectorVersion = containerTile.connectorVersion;
    summaryModel.hasTileSummaryMethod = containerTile.hasTileSummaryMethod;
    summaryModel.tileIcon = containerTile.tileIcon;

    summaryModel.HexColor = summaryModel.BackgroundColor !== undefined && summaryModel.BackgroundColor.HexColor !== undefined && summaryModel.BackgroundColor.HexColor !== "" ? summaryModel.BackgroundColor.HexColor : "";
    summaryModel.ColorClass = summaryModel.BackgroundColor !== undefined && summaryModel.BackgroundColor.CDPClass !== undefined && summaryModel.BackgroundColor.CDPClass !== "" ? summaryModel.BackgroundColor.CDPClass : "default";
    
    // set the tile preview
    // start with tile default
    summaryModel.previewTemplate = containerTile.previewTemplate;

    if (summaryModel.PreviewDefault === undefined){
        summaryModel.PreviewDefault = "Icon";
        summaryModel.PreviewTypes = [];
        summaryModel.PreviewTypes.push("Icon");
    }

    switch (summaryModel.PreviewDefault.toLowerCase()) {
      case TilePreviewEnum[TilePreviewEnum.Icon].toLowerCase():
          summaryModel.previewTemplate = TilePreviewEnum.Icon;
        break;

      case TilePreviewEnum[TilePreviewEnum.Summary].toLowerCase():
        summaryModel.previewTemplate = TilePreviewEnum.Summary;
        break;

      case TilePreviewEnum[TilePreviewEnum.SummaryList].toLowerCase():
        summaryModel.previewTemplate = TilePreviewEnum.SummaryList;
        break;

    }

    return summaryModel;
  };
}
