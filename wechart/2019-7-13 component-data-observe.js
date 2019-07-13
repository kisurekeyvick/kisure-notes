/**
 * 组件数据监听
 */

/** 
 * 作用：有时，在一些数据字段被 setData 设置时，需要执行一些操作。
 * 例如， this.data.sum 永远是 this.data.numberA 与 this.data.numberB 的和。此时，可以使用数据监听器进行如下实现。
 */

Component({
    attached: function() {
        this.setData({
            numberA: 1,
            numberB:2
        });
    },
    observers: {
        'numberA, numberB': function(numberA, numberB) {
            // 在 numberA 或者 numberB 被设置时，执行这个函数
            this.setData({
                sum: numberA + numberB
            });
        }
    }
})

// 监听字段语法
/** 
 * 数据监听器支持监听属性或内部数据的变化，可以同时监听多个。一次 setData 最多触发每个监听器一次。
 * 同时，监听器可以监听子数据字段，如下例所示。
 */
Component({
    observers: {
        'some.subfield': function(subfield) {
            // 使用 setData 设置 this.data.some.subfield 时触发
            // （除此以外，使用 setData 设置 this.data.some 也会触发
            subfield === this.data.some.subfield
        },
        'arr[12]': function(arr12) {
            // 使用 setData 设置 this.data.arr[12] 时触发
            // （除此以外，使用 setData 设置 this.data.arr 也会触发）
            arr12 === this.data.arr[12]
        }
    }
});

/** 
 * 如果需要监听所有子数据字段的变化，可以使用通配符 ** 
 */
Component({
    observers: {
        'some.field.**': function(field) {
          // 使用 setData 设置 this.data.some.field 本身或其下任何子数据字段时触发
          // （除此以外，使用 setData 设置 this.data.some 也会触发）
          field === this.data.some.field
        },
    },
    attached: function() {
        // 这样会触发上面的 observer
        this.setData({
            'some.field': { /* ... */ }
        })
        // 这样也会触发上面的 observer
        this.setData({
            'some.field.xxx': { /* ... */ }
        })
        // 这样还是会触发上面的 observer
        this.setData({
            'some': { /* ... */ }
        })
    }
});

/** 
 * 特别地，仅使用通配符 ** 可以监听全部 setData 。
 */
Component({
    observers: {
      '**': function() {
        // 每次 setData 都触发
      },
    },
})
