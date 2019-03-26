import { expect } from 'chai';
import { shallowMount, Wrapper, RouterLinkStub } from '@vue/test-utils';
import CatProfile from '@/components/CatProfile.vue';
import { getCats } from '@/services/api';
import Leadboard from '@/views/Leadboard.vue';
import { ICat } from '@/models/Cat';

describe('Leadboard.vue', () => {
  let wrapper: Wrapper<Leadboard>;

  beforeEach(() => {
    wrapper = shallowMount(Leadboard, {
      stubs: { 'router-link': RouterLinkStub }
    });
  });

  it('Should show a list of catsProfiles with scores', () => {
    // cats should have score
    const catsWithScores = wrapper.vm.$data.cats.filter((c: ICat) => c.score !== undefined);
    expect(catsWithScores.length).to.equal(wrapper.vm.$data.cats.length);

    expect(wrapper.findAll(CatProfile).length).to.equal(getCats().length);
  });
});