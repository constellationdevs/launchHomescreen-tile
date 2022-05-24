import ContainerResponse from "../models/CDP/ContainerResponse.model";
import ConnectorActionModel from "../models/MetaAction/ConnectorAction.model";
import MetaActionsEnum from "../models/MetaAction/MetaAction.enum";
import OpenPageActionModel from "../models/MetaAction/OpenPageAction.model";
import OpenTileActionModel from "../models/MetaAction/OpenTileAction.model";
import container, { tile } from "./container.svc";
import _ from "lodash";
import { Navigator } from "react-onsenui";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import DataSourceTypeEnum from "../models/enums/DataSourceType.enum";
import DataSourceModel from "../models/DataSource.model";

/* check if we are testing / running locally
 */
export function isLocalHost(): boolean {
  return location.hostname === "localhost";
}

/* return isNativeApp from the container
   - created as a helper function here so it can be overridden during testing
  */
export function isNativeApp(): boolean {
  return container.helper.isNativeApp();
  //  return true;
}

/* Allowable entry points for the tile
    - add react components to this list as needed
   */
const pageList = {
  HomePage,
  ErrorPage,
};

/* get the tile config json for the tile
 */
export function GetTileConfig(): Promise<any> {
  return new Promise((resolve, reject) => {
    container.tile.data.loadJsonFile("tileconfig.json", (res: any) => {
      const data = JSON.parse(JSON.stringify(res).replace(/&#x2F;/g, "/"));
     
      if (data.success) {
        resolve(data.data.filecontent);
      } else {
        reject();
      }
    });
  });
}

/*
    used to get a container method
    by reading the methods on the window and comparing it to the
    string that is passed in on the JS metaActions
    eg. "container.tile.goBack"
    */

const getFunctionFromString = (functionString: string) => {
  let scope = window;
  const scopeSplit = functionString.split(".");
  for (let i = 0; i < scopeSplit.length - 1; i++) {
    scope = scope[scopeSplit[i]];
    if (scope === undefined) {
      return;
    }
  }
  return scope[scopeSplit[scopeSplit.length - 1]];
};

/* run the tile invocation process
    - get the tileConfig
    - check for open data
    - use openData or fall back to tileConfig
    - process the metaAction from openData or tileConfig
  */
export function TileInit(nav: Navigator): Promise<string> {
  return new Promise((resolve, reject) => {
    container.tile.data.loadStrings(() =>
      GetTileConfig().then(
        (config) => {

          tile.tileConfig = config;

          let metaAction: any;
          metaAction = config.openData;


          if (metaAction !== undefined && metaAction !== null) {
            ProcessMetaAction(metaAction, nav, config);

            resolve("success");
          } else {
            reject("No meta Action");
          }
        },
        () => {
          // not tile fig
          console.error("no tile Config");
          reject("No Tile Config");
        }
      )
    );
  });
}

/* process the cdp component
  - check for the data prop, us it if found
  - no data prop, check for dataSource
    - no dataSource error out
    - if dataSource call it to populate the data prop
    - if dataSource is a callback function resolve and let caller handle getting the data
  - success return the cdpComponent with populated data prop
*/
export function ProcessCDPComponent(model: any): Promise<any> {

  return new Promise((resolve, reject) => {
    // check for data
    if (model.data === undefined || _.isEmpty(model.data)) {
      // no data check for data source
      if (model.dataSource === undefined || _.isEmpty(model.dataSource)) {
        // we are in trouble if we get here (no data and no dataSource)
        console.error("No Data or Source");
        reject();
      } else {
        const source: DataSourceModel = model.dataSource;
       
        switch (source.type) {
          case DataSourceTypeEnum.Connector:
           
            const params: object = model.dataSource.params
              ? model.dataSource.params
              : {};
            container.connectors.sendRequest(
              source.connectorName,
              source.connectorVersion,
              source.connectorMethod,
              params,
              (resp: ContainerResponse) => {
            
            
                if (resp.success) {                  
                  resolve(resp.data);
                } else {
                  console.error("ProcessCDPComponent: connector call");
                  reject();
                }
              }
            );
            break;

          case DataSourceTypeEnum.JsFunction:
            // handle the js in the calling function
            resolve(model);
            break;

          default:
            reject();
            break;
        }
      }
    } else {
      // we had data so return it
      return resolve(model);
    }
  });
}

/* process cdp meta action
    CallConnector
      - if no callback function is passed, then assume the connector returned a metaAction and recall ProcessMetaAction
  */
export function ProcessMetaAction(action: any, navigator: Navigator, tileConfig: any, methods?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const open: OpenTileActionModel = action;
    switch (action.actionType) {
      case MetaActionsEnum.OpenTile:
        // #region OpenTile
        // considered done.  No need for a call back function here because we are leaving the tile
        container.nav.launchTile(open.tileCode, open.tileVersion, () => console.info("launch Tile"), open.openData);
        resolve(true);
        // #endregion
        break;
      case MetaActionsEnum.CallConnector:
        // #region Call Connector
        // considered done.  Callback is handled by what ever called it
        const conn: ConnectorActionModel = action;
        const params: object = conn.params ? conn.params : {};

        container.connectors.sendRequest(conn.connectorName, conn.connectorVersion, conn.connectorMethod, params, (response: any) => {
          if (conn.callBackFunc === undefined || conn.callBackFunc === "") {
            ProcessMetaAction(response, navigator, tileConfig).then((x) => {
              resolve(x);
            });
          } else {
            resolve(response);
          }
        });
        // #endregion
        break;
      case MetaActionsEnum.OpenPage:
        // #region OpenPage
        // considered done
        // Need a page tile passed in on meta
        const openPage: OpenPageActionModel = action;
       
        const myComponent: any = pageList[openPage.component];

        if (myComponent !== undefined) {
          navigator.pushPage({
            component: myComponent,
            props: {
              tileConfig,
              componentModel: openPage.openData,
              methods,
            },
          });
        } else {
          GoToErrorPage(navigator, tileConfig);
        }

        // #endregion
        break;
      case MetaActionsEnum.JsFunction:
        // #region JS Function
        if (methods && methods[action.functionName]) {
          const jsParams = Object.values(action.params);
          
          methods[action.functionName](...jsParams);
          resolve(true);
        } else if (action.functionName.includes("container")) {
          const fnName = getFunctionFromString(action.functionName);
          const fnParams = action.params;
          if (typeof fnName === "function") {
            // fnName.apply(null,...[fnParams])
            fnName(fnParams, (response: any) => {
            
              if (response.success) {
                //
              } else {
                reject();
              }
            });
          }
        } else {
          reject(`No such function name "${action.functionName}"`);
        }
        break;

      case MetaActionsEnum.OpenTileModal:
        container.tile.openTile(open.tileCode, open.tileVersion, () => console.info("openTile"), open.openData, "_blank", "large");
        resolve(true);
        break;

      default:
        console.error(action);
        reject();
        break;
    }
  });
}

/* Push Error Page on the stack
    - the timeout function is used so the navigator can finish before being called again
  */
export function GoToErrorPage(navigator: any, tileConfig: any) {
 
  setTimeout(() => {
    navigator.pushPage({
      component: ErrorPage,
      props: {
        tileConfig,
        navigator,
      },
    });
  }, 1000);
}

export const getTileString = (code: any) => {
  if (container.tile.data && container.tile.data.getString) {
    return container.tile.data.getString(code);
  }
  return "";
};
