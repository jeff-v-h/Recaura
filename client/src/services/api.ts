export type OmitId<T> = Omit<T, 'id'>;

export type QueryStringValues = {
  readonly [key: string]: string | number | boolean | null | QueryStringValues;
};

export interface Api {
  get<TRes>(id: string, query?: QueryStringValues): Promise<TRes>;
  post<TReq, TRes = TReq>(id: string, request: TReq | OmitId<TReq>): Promise<TRes | void>;
  update<TReq, TRes = TReq>(id: string, request: TReq | OmitId<TReq>): Promise<TRes | void>;
  delete<TRes = void>(id: string): Promise<TRes>;
}
