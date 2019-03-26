import { DirectiveFunction, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

export const bg: DirectiveFunction = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVNode: VNode) => {
  el.style.backgroundImage = `url(${binding.value})`;
}