import { expect } from 'chai';
import { shallowMount, Wrapper, RouterLinkStub } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  let wrapper: Wrapper<Home>;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      stubs: { 'router-link': RouterLinkStub }
    });
  });

  it('Should select two versus cats at start', () => {
    expect((wrapper.vm as any).versusCats.length).to.equal(2);
  });

  it('Should be able to get random cat index', () => {
    expect(
      (wrapper.vm as any).getRandomCatIndex()
    ).to.not.be.equal(
      (wrapper.vm as any).getRandomCatIndex()
    );

    const catIndex = (wrapper.vm as any).getRandomCatIndex();

    expect(catIndex).to.be.above(0);
    expect(catIndex).to.be.below((wrapper.vm as any).cats.length);
  });

  it('Should be able to clean current versus', () => {
    (wrapper.vm as any).cleanVersus();
    expect((wrapper.vm as any).versusCats.length).to.equal(0);
  });

  // few percentage of test failing, not sure how to test it properly
  it('Should set new versus when selecting a winner', () => {
    const cat1 = (wrapper.vm as any).versusCats[0].id;
    const cat2 = (wrapper.vm as any).versusCats[1].id;

    (wrapper.vm as any).selectVersus();

    const cat3 = (wrapper.vm as any).versusCats[0].id;
    const cat4 = (wrapper.vm as any).versusCats[1].id;

    expect(cat1 != cat3 && cat2 != cat4).to.be.true;
  });
});