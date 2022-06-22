import MetaActionModel from "../MetaAction/MetaAction.model";
import QuickActionModel from "./QuickAction.model";

export default class AccountListItemModel {
    "iconImg": string;
    "statusColor":string;
    "statusIcon": string;
    "title": string;
    "subTitle": string;
    "warningMessage": string;
    "callout":  string;
    "subCallout": string;
    "metaAction": MetaActionModel;
    "quickActions": QuickActionModel[];
}