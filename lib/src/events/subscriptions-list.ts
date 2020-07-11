import { Subscription, SubscriptionType } from "./types";

export default class SubscriptionList {
  subscriptions: Subscription[] = [];

  has(subscription: Subscription): boolean {
    return this.subscriptions
      .filter((sub) => sub.topic === subscription.topic)
      .some((sub) => sub.type === subscription.type);
  }

  add(subscription: Subscription): boolean {
    if (!this.has(subscription)) {
      this.subscriptions.push(subscription)

      window.addEventListener(subscription.topic, subscription.listener);
      return true;
    }
    return false;
  }

  remove(topic: string, type: SubscriptionType): void {
    const subscription: Subscription | undefined = this.subscriptions.find(s => {
      return s.topic === topic && s.type === type
    });

    if (!subscription) return;


    const index: number = this.subscriptions.indexOf(subscription);
    this.subscriptions.splice(index, 1);
    window.removeEventListener(subscription.topic, subscription.listener);
  }
}
