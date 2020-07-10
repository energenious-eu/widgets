import { UID } from "../types";

export interface Detail<T> {
  uids?: UID[];
  params: T;
}

export enum SubscriptionType {
  FULL = 'FULL',
  SELECTIVE = 'SELECTIVE',
}

export interface Subscription {
  topic: string;
  type?: SubscriptionType;
  listener<T>(e: CustomEvent<Detail<T>>): void;
}
