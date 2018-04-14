import IModel from "../logic/model/IModel";

export default interface IState<SourceModel> {
  equals(): boolean;
};
