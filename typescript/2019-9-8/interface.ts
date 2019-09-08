import { Agent } from "http";

// （1）定义只读属性
interface IDemo {
    name: string;
    readonly like: Array<string>
}

const kisure: IDemo = {
    name: 'nice fish',
    like: ['game', 'code']
};

kisure.like = ['123'];  // 因为是只读的，所以不能进行修改

console.log(kisure);

// （2）定义函数接口
interface IFunc {
    (name: string, age: number): {name: string; age: string;}
}

const getUserInfo: IFunc = (name, age) => {
    return {
        name, age: age + ''
    };
}

getUserInfo('kisure', 12);

// （3）ts在3.0以后，支持给函数混合属性的接口
interface IFuncCounter {
    ():void,
    counter: number //函数还包含属性counter
}

const counterFunc = (): IFuncCounter => {
    const c: any = () => { return c.count++ };
    c.count = 0;
    return c;
};

const getCount: IFuncCounter = counterFunc();
getCount();
