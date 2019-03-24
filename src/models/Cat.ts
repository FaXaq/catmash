import db from '@/services/db';

export interface ICat {
  url: string;
  id: string;
  versus?: boolean;
}

export const CatModel = db.ref('cats');
