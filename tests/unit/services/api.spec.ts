import { expect } from 'chai';
import { getCats } from '@/services/api';

describe('API', () => {
  describe('getCats', () => {
    it('Should return an array of objects with properties url and id', () => {
      const cats = getCats();
      expect(cats).to.not.be.undefined;
      expect(cats instanceof Array).to.be.true;
    });
  });
});
