import IBasePropsModel from "../base/IBaseProps.model";
import AccountModel from "./Account.model";

export default interface IAccountCardPropModel extends IBasePropsModel{
    data: AccountModel;
}