import sinon from 'sinon';
import { expect } from 'chai';

import Block from './Block.ts';

describe('Component', () => {
  class Component extends Block {
    render() {
      return this.compile(tpl);
    }
  }

  let component: Component;
  const tpl: string = '<p>{{content}}</p>';

  beforeEach(() => {
    component = new Component('div', { content: 'Hello' });
  });

  it('should create html element', () => {
    const htmlElement = component.getContent().outerHTML;
    const expectedHtmlElement = '<div><p>Hello</p></div>';
    expect(htmlElement).to.equal(expectedHtmlElement);
  });

  it('should refresh props and rerender component', () => {
    const spy = sinon.spy(component, 'render');
    const newContent = 'New content';

    component.setProps({ content: newContent });

    expect(spy.calledOnce).to.be.true;
    expect(component.getContent().outerHTML).to.equal(`<div><p>${newContent}</p></div>`);
  });

  it('should call componentDidMount', () => {
    const spy = sinon.spy(Block, 'componentDidMount');

    component.dispatchComponentDidMount();

    expect(spy.calledOnce).to.be.true;
  });

  it('should set events', () => {
    const clickHandler = sinon.spy();

    const props = {
      events: {
        click: clickHandler,
      },
    };

    component.setProps(props);
    const element = component.getContent();
    element.click();
    expect(clickHandler.calledOnce).to.be.true;
  });
});
