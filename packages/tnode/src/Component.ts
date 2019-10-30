import Updater from './updater';
import Element from './element';

abstract class Component<S = {}, P = {}> {
  protected state?: S;
  protected props?: P;
  // private updater?: Updater;

  protected abstract componentDidMount?(): void;
  protected abstract render?(): Element;

  constructor(props: P, updater?: any) {
    this.props = props;
    // this.updater = {};
  }
}

export default Component;