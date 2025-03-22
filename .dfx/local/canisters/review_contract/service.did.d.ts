import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Review {
  'id' : bigint,
  'author' : string,
  'timestamp' : bigint,
  'review_text' : string,
}
export interface State { 'reviews' : Array<Review> }
export interface _SERVICE {
  'add_review' : ActorMethod<[string, string], undefined>,
  'clear_all_reviews' : ActorMethod<[], undefined>,
  'get_reviews' : ActorMethod<[], Array<Review>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
