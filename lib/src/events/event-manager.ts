import { UID } from '../types';
import SubscriptionList from './subscriptions-list';
import { Detail, SubscriptionType, Subscription } from './types';

export default class EventManager {
  private scope: string;
  private uid: string;
  private eventRoot: HTMLElement;

  private subscriptions: SubscriptionList;

  constructor(scope: string, uid: string, parentElementId: string) {
    this.scope = scope;
    this.uid = uid;
    this.eventRoot = document.querySelector(parentElementId)?.parentElement || document.body;

    this.subscriptions = new SubscriptionList(this.eventRoot);
  }

  private emit<T = any>(topic: string, detail: Detail<T>): void {
    const event: CustomEvent<Detail<T>> = new CustomEvent<Detail<T>>(topic, {
      detail,
    });

    this.eventRoot.dispatchEvent(event);
  }

  broadcast<T = any>(topic: string, params: T): void {
    this.emit<T>(topic, { params });
  }

  scopedBroadcast<T = any>(topic: string, params: T): void {
    this.emit<T>(this.scopeTopic(topic), { params });
  }

  multicast<T = any>(topic: string, uids: string[], params: T): void {
    const detail: Detail<T> = { uids, params };

    this.emit<T>(topic, detail);
  }

  scopedMulticast<T = any>(topic: string, uids: string[], params: T): void {
    const detail: Detail<T> = { uids, params };

    this.emit<T>(this.scopeTopic(topic), detail);
  }

  private sub<T = any>({
    topic,
    type = SubscriptionType.FULL,
    callback,
  }: {
    topic: Subscription['topic'];
    type?: Subscription['type'];
    callback: (e: T) => any;
  }) {
    const listener = (e: CustomEvent<Detail<T>>) => {
      const uids: UID[] = e.detail.uids || [];

      // If broadcast or uid specified in multicast
      if ((uids.length === 0 && type === SubscriptionType.FULL) || uids.includes(this.uid)) {
        callback(e.detail.params);
      }
    };

    this.subscriptions.add({
      topic,
      type,
      listener: listener as <T>(e: CustomEvent<Detail<T>>) => void,
    });
  }

  subscribe<T = any>(topic: string, callback: (detail: T) => void) {
    this.sub({ topic, callback });
  }

  scopedSubscribe<T = any>(topic: string, callback: (detail: T) => void) {
    this.sub({ topic: this.scopeTopic(topic), callback });
  }

  selectiveSubscribe<T = any>(topic: string, callback: (detail: T) => void) {
    this.sub({ topic, callback, type: SubscriptionType.SELECTIVE });
  }

  unsubscribe(topic: string, type: SubscriptionType) {
    this.subscriptions.remove(topic, type);
  }

  scopedUnsubscribe(topic: string) {
    this.subscriptions.remove(this.scopeTopic(topic));
  }

  private scopeTopic(topic: string) {
    return `${this.scope}_${topic}`;
  }
}
