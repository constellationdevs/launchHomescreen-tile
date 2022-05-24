import ContainerConnectorModel from "../CDP/ContainerConnector.model";
import TilePreviewEnum from "./TilePreview.enum";

export default class TileModel{
    
    tileTitle: string; 
    tileCode: string;
    tileVersion: string;    
    tileIcon: string;
    connectorName: string;    
    connectorVersion: string;
    hasTileSummaryMethod: boolean
    previewTemplate: TilePreviewEnum;

    constructor(title: string, code: string, version: string, icon: string, connector: ContainerConnectorModel[]){
        this.tileTitle = title;
        this.tileCode = code;
        this.tileVersion = version;
        this.tileIcon = icon;
        this.hasTileSummaryMethod = false;
        this.previewTemplate = TilePreviewEnum.Icon;
        if (connector.length > 0){
            this.connectorName = connector[0].ConnectorName;
            this.connectorVersion = connector[0].ConnectorVersion;
            this.hasTileSummaryMethod = true;
        }
    }
}