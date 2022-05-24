import IBasePropsModel from "../base/IBaseProps.model";
import TileSummaryModel from "./TileSummary.model";

export default interface ITilePropModel extends IBasePropsModel {
    data: TileSummaryModel;
  }