import ConnectorActionModel from "./ConnectorAction.model";

export class RequestFileModel extends ConnectorActionModel {
  mimeType: string;
  filename: string;
  generateText: string;
  downloadText: string;
}

export default RequestFileModel;
