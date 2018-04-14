import IState from "../../state/IState";

export default interface IModel {
  getState(): IState;
};
