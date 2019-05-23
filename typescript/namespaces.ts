/// <reference path="./namespace-Utility.ts" />

/**
 * https://www.tslang.cn/docs/handbook/namespaces.html
 * 
 * 例如我们写的验证器，随着更多验证器的加入，我们需要一种手段来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。
 * 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。
 */
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

/**
 * 引用命名空间：/// <reference path="./namespace-Utility.ts" />
 */
Utility.log('Call me');
Utility.error('maybe');
