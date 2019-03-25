import { expect } from 'chai';
import { shallowMount, Wrapper } from '@vue/test-utils';
import CatProfile from '@/components/CatProfile.vue';

const cat = {
  url: 'https://randomurl.org/jpg',
  id: '1234',
};

describe('CatProfile.vue', () => {
  let wrapper: Wrapper<CatProfile>;

  beforeEach(() => {
    wrapper = shallowMount(CatProfile, {
      propsData: { cat },
    });
  });

  it('Should create an image and a paragraph with a cat provided', () => {
    expect(wrapper.contains('img')).to.be.true;
    expect(wrapper.contains('p')).to.be.true;
    
    expect(wrapper.find('img').attributes('src')).to.equal(cat.url);
    expect(wrapper.text()).to.include(cat.id);
  });

  it('Should show score when provided', () => {
    const score = 123141;
    const newCat = Object.assign({}, cat, { score });

    wrapper = shallowMount(CatProfile, {
      propsData: {
        cat: newCat,
      },
    });

    expect(wrapper.find('p.score').text()).to.include(score);
  });
});
