import router from '../index.ts';
import SignIn from '../pages/SignIn';
import authApi from '../services/api/AuthApi.ts';

export function loginRequired(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Called method "${propertyKey}" of`, target);
    authApi.getUserInfo()
      .then((xhr) => {
        console.log(xhr.status);
        if (xhr.status === 401) {
          router.go(SignIn.url);
          return;
        }
      });

    return originalMethod.apply(this, args);
  };

  return descriptor;
}
