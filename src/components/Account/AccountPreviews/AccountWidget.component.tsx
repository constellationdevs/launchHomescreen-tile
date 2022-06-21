import React, { Component } from "react";
import {Card, Icon, List, ListItem} from "react-onsenui";

export default class AccountWidget extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const headerStyle = {
            backgroundColor: `${this.props.data.HexColor}`,
        };

        const img =
            this.props.data.Image !== "" ? (
                <div className="imageContainer">
                    <img src={this.props.data.Image} className="headerImage"></img>
                </div>
            ) : (
                <></>
            );

        return (
            <>
                <div className="cdpTile summaryCard">
                    <div className="cdpCard">
                        <Card className={this.props.data.ColorClass} style={headerStyle}>
                            <div className="widgetHeader">
                                <div className={"widgetHeaderContainer " + (this.props.data.Image === "" ? "noImage" : "")}>
                                    <h1>{this.props.data.tileTitle}</h1>
                                    <h2>{this.props.data.CallOut}</h2>
                                </div>
                                {img}
                                <div className="openTile">
                                    <i className="fa fa-2x fa-angle-right"></i>
                                </div>
                            </div>
                            <div className="cardBody">
                                <List>
                                    <ListItem>
                                        item 1
                                    </ListItem>
                                    <ListItem>
                                        item 2
                                    </ListItem>
                                    <ListItem>
                                        item 2
                                    </ListItem>
                                </List>
                            </div>
                        </Card>
                    </div>
                </div>
            </>
        );
    }
}
