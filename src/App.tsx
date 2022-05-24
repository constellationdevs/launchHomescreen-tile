import React, { Component, createRef, RefObject, createElement } from "react";
import { Navigator } from "react-onsenui";

import { TileInit, GoToErrorPage, GetTileConfig } from "./services/helper.svc";

export default class App extends Component<any, any> {
  // create a reference to the onsen Navigator
  navEl: RefObject<Navigator> = createRef();

  constructor(props: any) {
    super(props);

    this.state = {
      tileConfig: {},
      openMenu: false,
    };

    this.navEl = createRef();

    GetTileConfig().then((data) => {
      this.setState({ tileConfig: data });
    });
  }

  showMenu = () => {
    this.setState({ openMenu: true });
  };

  /* only render the onsen navigator
    Let the tileInit decide what to do
   */
  render() {
    const renderPage = (route: any, appNavigator: Navigator) => {
      // @ts-ignore
      if (!appNavigator.clone) {
        appNavigator = this.initTileAndNavigatorForPlatform(appNavigator);
      }

      const props = route.props || {};
      props.navigator = appNavigator;

      props.tileConfig = this.state.tileConfig;

      return createElement(route.component, props);
    };

    return <Navigator id="AppNavigator" key="AppNavigator" renderPage={renderPage} ref={this.navEl} />;
  }

  componentDidMount() {
    // The navigator is rendered now Init the Tile by getting the TileConfig and any openData
    // if this fails go to error page
    const nav = this.navEl.current;
    if (nav) {
      TileInit(nav).then(
        (data) => {
          console.info("Tile Init");
        },
        (msg) => {
          // failed
          console.error(msg);
          GoToErrorPage(nav, null);
        }
      );
    }
  }

  /* set up the react onsen nav to play nice with the container nav
   */
  initTileAndNavigatorForPlatform(appNavigator: Navigator): any {
    // This is exists to prevent promises from not resolving with the container

    // @ts-ignore
    appNavigator.clone = appNavigator._navi;

    // @ts-ignore
    appNavigator.clone.pushPage = () => {
      console.info("clone pushing page...");
    };

    return appNavigator;
  }
}
