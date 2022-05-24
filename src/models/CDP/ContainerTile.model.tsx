import ContainerConnectorModel from "./ContainerConnector.model";
import TileImageModel from "./TileImage.model";

export default class ContainerTileModel{
    TileStatus: string;
    TileVersion: string;
    TileCode: string;
    TileDescription: string;
    Title: string;
    Connectors: ContainerConnectorModel[];
    Categories: string[];
    TileImages: TileImageModel[];
    Icon: string;
}