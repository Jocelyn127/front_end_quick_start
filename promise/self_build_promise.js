


function Promise(executor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
    //保存实例对象this的值
    const self = this;

    function resolve(data) {
        if (self.PromiseState !== 'pending') return;
        // 修改对象的状态 promiseState
        self.PromiseState = 'fulfilled'
        // 设置对象的结果值 promiseResult
        self.PromiseResult = data;
        // 调用成功的回调函数
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data);
            });
        });
    }

    function reject(data) {
        if (self.PromiseState !== 'pending') return;
        // 修改对象的状态 promiseState
        self.PromiseState = 'rejected';
        self.PromiseResult = data;
        // 设置对象的结果值 promiseResult
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onRejected(data);
            });
        });
    }

    // 执行器函数同步调用
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }

}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason;
        }
    }
    if (typeof onResolved !== 'function') {
        onResolved = value => {
            return value;
        }
    }
    return new Promise((resolve, reject) => {
        function callback(type) {
            try {
                let result = type(self.PromiseResult);
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    });
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }



        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
                callback(onResolved);
            });
        }
        if (this.PromiseState === 'rejected') {
            setTimeout(() => {
                callback(onRejected);
            });

        }
        if (this.PromiseState === 'pending') {
            //保存回调函数
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                }
            });
        }
    })
}

Promise.prototype.catch = function (onRjected) {
    return this.then(undefined, onRjected);
}

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        } else {
            resolve(value);
        }
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let arr = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                count++;
                arr[i] = v;
                if (count === promises.length) {
                    resolve(arr);
                }
            }, r => {
                reject(r);
            })
        }
    });
}


Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        }
    });
}