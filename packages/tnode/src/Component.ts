import Updater from './updater';
import Element, { TAG_TYPE } from './element';

class Component<S = {}, P = {}> {
  public static tagType?: TAG_TYPE = TAG_TYPE.COMPONENT;
  public name?: string;
  protected state?: S;
  protected props?: P;
  // private updater?: Updater;

  protected componentDidMount?(): void;
  public render?(): Element;

  constructor(props?: P, updater?: any) {
    this.props = props;
    // this.updater = {};
  }
}

export default Component;