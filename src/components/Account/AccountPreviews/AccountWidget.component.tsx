import React, { Component } from "react";
import {Card, Icon, List, ListHeader, ListItem} from "react-onsenui";
import AccountListItemModel from "../../../models/Account/AccountListItem.model";

export default class AccountWidget extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state={
            isOpen: false,
            target:{}
        }
    }

    data ={
        "listHeader": "Your Accounts",
        "listItems": [
            {
                "iconImg": "fa-solid fa-piggy-bank",
                "statusColor": "success",
                "title": "Savings",
                "subTitle": "****1894",
                "callout": "$5,320.87",
                "subCallout": "Account Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "",
                        "label": "",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "savGoal",
                            "tileVersion": "1.0.0"
                        }
                    },
                    {
                        "iconImg": "",
                        "label": "",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    }
                ]
            },
            {
                "iconImg": "fa-solid fa-money",
                "statusColor": "danger",
                "statusIcon":"fa-exclamation-circle",
                "title": "Classic Checking",
                "subTitle": "****5467",
                "callout": "$5.00",
                "subCallout": "Account Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "",
                        "Amount": "",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "BillPay",
                            "tileVersion": "1.0.0"
                        }
                    },
                    {
                        "iconImg": "",
                        "Amount": "",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    }
                ]
            }
        ]
    };


    render() {
        const headerStyle = {
            backgroundColor: "purple",
        };



        return (
            <>
                <div className="cdpTile accountWidgetCard">
                    <div className="cdpCard">
                        <Card  style={headerStyle}>
                            <div className="cardBody">
                                <List>
                                    <ListHeader>{this.data.listHeader}</ListHeader>
                                    {/*@ts-ignore*/}
                                    {this.data.listItems.map((item:AccountListItemModel) => {
                                            return(<ListItem>
                                                <div className="left">
                                                    <Icon className={`${item.iconImg}`}/>
                                                </div>
                                                <div className="center">
                                                    <div className={`title ${item.statusColor}`}>{item.title}
                                                        {item.statusIcon?<Icon className={`${item.statusIcon} status-icon`}/> : <></>}
                                                    </div>
                                                    <div className={`sub-title`}>{item.subTitle}</div>

                                                </div>
                                                <div className="right">
                                                    <div className="callOut">{item.callout}</div>
                                                    <div className="subCallout">{item.subCallout}</div>
                                                </div>
                                            </ListItem>)
                                        }
                                    )}
                                </List>
                            </div>
                        </Card>
                    </div>
                </div>
            </>
        );
    }
}
