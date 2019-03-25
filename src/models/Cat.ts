import db from '@/services/db';

export interface ICat {
  url: string;
  id: string;
  versus?: boolean;
  score?: number;
}

export const CatModel = db.ref('cats');
