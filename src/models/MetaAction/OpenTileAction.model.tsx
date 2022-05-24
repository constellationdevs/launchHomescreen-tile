import MetaActionModel from "./MetaAction.model";

export class OpenTileActionModel extends MetaActionModel {
    tileCode: string;
    tileVersion: string;
    callbackFunc: string;
    openData: any;
}

export default OpenTileActionModel;