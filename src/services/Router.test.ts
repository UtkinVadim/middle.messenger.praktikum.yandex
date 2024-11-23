import sinon from 'sinon';
import { expect } from 'chai';

import Block from './Block.ts';
import Router from './Router.ts';

describe('Router', () => {
  let router: Router;

  class Component extends Block {
    render() {
      return this.compile('<div></div>>');
    }
  }

  beforeEach(() => {
    router = new Router('.test_app');
    router.start();
  });

  it('should create route and add it in routes', () => {
    expect(router.routes).to.have.lengthOf(0);

    router.use('/1', new Component());
    router.use('/2', new Component());
    router.use('/2', new Component());

    expect(router.routes).to.have.lengthOf(3);
  });

  it('should increase history length when navigating to a new page using go method', () => {
    const pathname = '/sign-up';
    router.use(pathname, new Component());

    expect(global.history.length).to.equal(1);

    router.go(pathname);

    expect(global.history.length).to.equal(2);
    expect(global.location.pathname).to.equal(pathname);
  });

  it('should call back method', () => {
    const backSpy = sinon.spy(window.history, 'back');

    router.back();

    expect(backSpy.calledOnce).to.be.true;
  });

  it('should find Route object by pathname', () => {
    const pathname = '/pathname';

    router.use(pathname, new Component());

    const route = router.getRoute(pathname);

    expect(route).to.exist;
    expect(route?.match(pathname)).to.be.true;
  });
});
