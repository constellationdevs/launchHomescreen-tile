container.connectors.sendRequest = (connectorName, connectorVersion, connectorMethod, requestParams, callbackFunc) => {

  const response = {
    success: true,
    data: {},
    message: ""
  };
  const fileName = `mock/${connectorName}_${connectorVersion}_${connectorMethod}.json`;

  container.tile.data.loadJsonFile(fileName, (fileData) => {

    response.data = fileData.data.filecontent.data;

    callbackFunc(response)
  });

};


container.tiles.allAvailable = (filter, callbackFunc) => {
  const response = {
    "success": true,
    "data": {
      "tiles": [{
        "TileStatus": "Active",
        "TileVersion": "1.1.0",
        "TileCode": "12345678-EDC0-48FC-BA65-665D68597680",
        "TileDescription": "Members can perform internal and external account transfers using one seamless interface.",
        "Title": "CDP - Transfers",
        "Connectors": [{
          "ConnectorVersion": "1.0.0",
          "ConnectorName": "Transfers"
        }],
        "Categories": [],
        "TileImages": [{
          "ImageName": "externalaccount.png",
          "ImagePath": "https://static.cdp-cdn.com/tiles/5C669D9D-EDC0-48FC-BA65-665D68597680/2.6.0/externalaccount.png"
        }, {
          "ImageName": "fromaccount.png",
          "ImagePath": "https://static.cdp-cdn.com/tiles/5C669D9D-EDC0-48FC-BA65-665D68597680/2.6.0/fromaccount.png"
        }],
        "Icon": "https://static.cdp-cdn.com/tiles/5C669D9D-EDC0-48FC-BA65-665D68597680/2.6.0/tileicon.png"
      }, {
        "TileStatus": "Active",
        "TileVersion": "1.0.0",
        "TileCode": "7559F10E-9583-4A66-A4BF-1C639A48AF7F",
        "TileDescription": "Easy viewing of authenticated user's core accounts",
        "Title": "CDP - Account Viewer",
        "Connectors": [],
        "Categories": [],
        "TileImages": [],
        "Icon": "https://static.cdp-cdn.com/tiles/7559F10E-9583-4A66-A4BF-1C639A48AF7F/1.0.1/tileicon.png"
      }, {
        "TileStatus": "Active",
        "TileVersion": "1.0.0",
        "TileCode": "123ABC4-8174-4199-95A0-B4CE1B7C735A",
        "TileDescription": "",
        "Title": "CDP - Stop Payment",
        "Connectors": [{
          "ConnectorVersion": "1.0.0",
          "ConnectorName": "StopPayment"
        }],
        "Categories": [],
        "TileImages": [{
          "ImageName": "check.png",
          "ImagePath": "https://static.cdp-cdn.com/tiles/5D2F3AD2-8174-4199-95A0-B4CE1B7C735A/1.0.0/check.png"
        }],
        "Icon": "https://static.cdp-cdn.com/tiles/5D2F3AD2-8174-4199-95A0-B4CE1B7C735A/1.0.0/tileicon.png"
      }, {
        "TileStatus": "Active",
        "TileVersion": "1.0.0",
        "TileCode": "ABCD1234-532C-4B8B-B6B1-18B234CE088D",
        "TileDescription": "Bill Pay",
        "Title": "Billpay",
        "Connectors": [{
          "ConnectorVersion": "1.0.0",
          "ConnectorName": "BillPay"
        }],
        "Categories": [],
        "TileImages": [],
        "Icon": "https://static.cdp-cdn.com/tiles/CE04EE17-532C-4B8B-B6B1-18B234CE088D/1.0.0/tileicon.png"
      }, {
        "TileStatus": "Active",
        "TileVersion": "1.0.0",
        "TileCode": "98765432-400E-41F6-842A-41E8ADACE6C4",
        "TileDescription": "Provides key information about the credit union to the member",
        "Title": "About",
        "Connectors": [{
          "ConnectorVersion": "1.0.0",
          "ConnectorName": "About"
        }],
        "Categories": [],
        "TileImages": [],
        "Icon": "https://static.cdp-cdn.com/tiles/4A6432F6-400E-41F6-842A-41E8ADACE6C4/1.0.0/tileicon.png"
      }, {
        "TileStatus": "Active",
        "TileVersion": "1.0",
        "TileCode": "65432178-A25F-47B4-B257-46D1DB76BBF0",
        "TileDescription": "Quickly and easily find the branch location that is closest to you.",
        "Title": "Branch Locator",
        "Connectors": [{
          "ConnectorVersion": "1.0.0",
          "ConnectorName": "Branch"
        }],
        "Categories": [],
        "TileImages": [{
          "ImageName": "userdot.png",
          "ImagePath": "https://static.cdp-cdn.com/tiles/43D5F10B-A25F-47B4-B257-46D1DB76BBF0/1.0/userdot.png"
        }],
        "Icon": "https://static.cdp-cdn.com/tiles/43D5F10B-A25F-47B4-B257-46D1DB76BBF0/1.0/tileicon.png"
      }]
    },
    "message": ""
  };
  callbackFunc(response);
};