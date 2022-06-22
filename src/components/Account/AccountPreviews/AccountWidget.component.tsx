import React, { Component } from "react";
import {Button, Card, Icon, List, ListHeader, ListItem, Modal} from "react-onsenui";
import AccountListItemModel from "../../../models/Account/AccountListItem.model";

export default class AccountWidget extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state={
            isOpen: false,
            target:{},
            modalOpen: false,
            modalBody:"",
            modalTitle:"",
            quickOpen: false,
            quickActions:[]

        }
    }

    balanceWarning = "The balance on your account is near the limit. Ensure your balance remains above $5.00 in order to remain enrolled in the No-Fee Savings Account"
    balanceError = "The balance on your account is under the limit. Ensure your balance remains above $2,000 in order to remain enrolled in the No-Fee Money Market"
    creditCardError = "The payment on your account is due in 5 days.  Please visit the transfer tile to make your payment before June 27th"

    data ={
        "listHeader": "Your Accounts",
        "listItems": [
            {
                "iconImg": "fas fa-piggy-bank",
                "statusColor": "success",
                "statusIcon": "",
                "title": "Savings",
                "subTitle": "****1894",
                "callout": "$5,320.87",
                "subCallout": "Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "fas fa-exchange",
                        "label": "transfer",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "savGoal",
                            "tileVersion": "1.0.0"
                        }
                    }
                ]
            },
            {
                "iconImg": "fas fa-money-check-alt",
                "statusColor": "warning",
                "statusIcon": "fas fa-exclamation-triangle",
                "warningMessage":"balanceWarning",
                "title": "Classic Checking",
                "subTitle": "****5467",
                "callout": "$5.00",
                "subCallout": "Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "fas fa-file-invoice-dollar",
                        "label": "Bill Pay",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "BillPay",
                            "tileVersion": "1.0.0"
                        }
                    },
                    {
                        "iconImg": "fa-dollar",
                        "label": "P2P Transfer",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    },
                    {
                        "iconImg": "fa-exchange",
                        "label": "Make a Transfer",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    }
                ]
            },
            {
                "iconImg": "fa-coins",
                "statusColor": "danger",
                "statusIcon": "fas fa-exclamation-circle",
                "warningMessage": "balanceError",
                "title": "Money Market",
                "subTitle": "****5638",
                "callout": "$1500.00",
                "subCallout": "Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "fas fa-exchange",
                        "label": "Transfer",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    }
                ]
            },
            {
                "iconImg": "fas fa-car-alt",
                "statusColor": "warning",
                "statusIcon": "fa-solid fa-exclamation-triangle",
                "warningMessage":"creditCardError",
                "title": "Auto Loan",
                "subTitle": "****5638",
                "callout": "$14,765.34",
                "subCallout": "Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "fa fa-exchange",
                        "label": "Make a Payment",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    }
                ]
            },
            {
                "iconImg": "fa-credit-card",
                "statusColor": "success",
                "statusIcon": "",
                "title": "Credit Card",
                "subTitle": "****5638",
                "callout": "$2,302.45",
                "subCallout": "Options",
                "metaAction": {
                    "actionType": 1,
                    "tileCode": "openAccount",
                    "tileVersion": "1.0.0"
                },
                "quickActions": [
                    {
                        "iconImg": "fas fa-exchange",
                        "label": "Make a Payment",
                        "metaAction": {
                            "actionType": 1,
                            "tileCode": "Transfer",
                            "tileVersion": "1.0.0"
                        }
                    },
                    {
                        "iconImg": "fas fa-gift",
                        "label": "Rewards",
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

        // @ts-ignore
        return (
            <>
                <div className="cdpTile accountWidgetCard">
                    <div className="cdpCard">
                        <Card>
                            <div className="cardBody">
                                <List>
                                    <ListHeader>{this.data.listHeader}</ListHeader>
                                    {/*@ts-ignore*/}
                                    {this.data.listItems.map((item:AccountListItemModel) => {
                                            return(<ListItem key={item.title+"-" + item.subTitle} >
                                                <div className="left">
                                                    <Icon className={`${item.iconImg}`}/>

                                                </div>
                                                <div className="center">
                                                    <div className={`title ${item.statusColor}`}>{item.title}
                                                        {item.statusIcon ?
                                                            <span onClick={()=>this.setState({modalOpen: true,modalTitle:`${item.title} Warning`, modalBody:this[item.warningMessage]})}>
                                                                <Icon className={`${item.statusIcon} status-icon`}/>
                                                            </span> : <></>}
                                                    </div>
                                                    <div className={`sub-title`}>{item.subTitle}</div>

                                                </div>
                                                <div className="right">
                                                    <div className="callOut">{item.callout}</div>
                                                    <div>
                                                        <div className="subCallout" onClick={()=>this.setState({quickOpen:true, quickActions:item.quickActions})}>
                                                            {item.subCallout}
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListItem>)}
                                    )}
                                </List>
                            </div>
                        </Card>
                    </div>
                </div>
                {/*@ts-ignore*/}
                    <Modal isOpen={this.state.modalOpen}>
                        <Card className ="modal-card">
                            <div className ="modal-card-header">Account Alert</div>
                            <div className={"modal-card-body"}>
                                <div className={"modal-card-title"}>{this.state.modalTitle}</div>
                                <div className={"modal-card-text"}>{this.state.modalBody}</div>
                                <div className={"modal-card-button"}>
                                    <Button className={"btn primaryBtn"} onClick={()=>this.setState({modalOpen:false, modalTitle:"", modalBody:""})}>Close</Button>
                                </div>
                            </div>
                        </Card>
                    </Modal>

                <Modal isOpen={this.state.quickOpen}>
                <Card>
                    <List>
                        <ListHeader><span>Quick Actions</span><span style = {{float: "right"}}onClick={()=>this.setState({quickOpen:false, quickActions:[]})}><Icon className="fa-times-circle"/></span></ListHeader>
                        {/*@ts-ignore*/}
                        {this.state.quickActions.map((item:QuickActionModel) => {
                            return(<ListItem key={item.label}>
                                <div className="left">
                                    <Icon className={`${item.iconImg}`}/>
                                </div>
                                <div className="center">
                                    <div>{item.label}</div>
                                </div>
                            </ListItem>)}
                        )}
                    </List>
                    </Card>
                </Modal>
            </>
        );
    }
}
