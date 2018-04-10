declare module "promise-worker" {
  class PromiseWorker<PostValueType, ThenValue> {
    constructor(worker: Worker);
    postMessage(userMessage: PostValueType): Promise<ThenValue>;
  }

  export = PromiseWorker;
}
