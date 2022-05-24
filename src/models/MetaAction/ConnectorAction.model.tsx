import MetaActionModel from "./MetaAction.model";

export class ConnectorActionModel extends MetaActionModel {
  connectorName: string;
  connectorMethod: string;
  connectorVersion: string;
  params: any;
  callBackFunc: any;

  ConnectorActionModel(){
    // tslint:disable-next-line:no-empty
    this.callBackFunc = ()=>{}
}
}

export default ConnectorActionModel;