//张俊的
(function() {

    var base = function(selector, context) {
        if (typeof selector === 'function') {
            // 如果传入的第一个参数是函数 此时该函数为就绪事件
            ready(selector);
            return; //终止函数执行
        }
        return new Base(selector, context);
    }

    /**
     * @param {string} selector 
     * @param {HTMLElement} [context] 
     */
    function Base(selector, context) {
        var elements; //选择到的元素集合

        if (selector.nodeType === 1) {
            // 如果传入第一个参数的是DOM元素 我们就将这个元素封装成自己的Base类型
            this[0] = selector;
            Object.defineProperty(this, 'length', {
                value: 1
            });

        } else {
            elements = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
            Object.assign(this, elements); // 合并对象
            Object.defineProperty(this, 'length', {
                value: elements.length
            });
        }


    }

    Base.prototype = {
        constructor: Base, //修复constructor指针
        each: function(callback) { // 遍历被选中的元素
            for (var i = 0; i < this.length; i++) {
                callback(this[i], i);
            }
        },
        on: function(type, callback) {
            if (typeof type === 'string' && callback) {
                if (this[0].addEventListener) { //判断是否支持DOM2级事件
                    this.each(function(elm, i) { //遍历选择到的元素
                        elm.addEventListener(type, callback); //添加事件
                    });
                } else if (this[0].attachEvent) { //判断是否支持IE
                    this.each(function(elm, i) { //遍历选择到的元素
                        elm.attachEvent("on" + type, callback); //添加事件
                    });
                }
            } else if (typeof type === 'object' && this[0]) {
                if (this[0].addEventListener) {
                    this.each(function(elm, i) { // 遍历选择到的每一个元素
                        each(type, function(key, val) { // 遍历对象，获得key,val

                            elm.addEventListener(key, val);
                        });
                    });
                } else if (this[0].attachEvent) {
                    this.each(function(elm, i) { // 遍历选择到的每一个元素
                        each(type, function(key, val) { // 遍历对象，获得key,val
                            elm.attachEvent("on" + key, val);
                        });
                    });
                }
            }
        },
        css: function(style, value) {
            var str = "";
            var str2 = "";
            if (typeof style === "string" && value) {
                this.each(function(elm, i) {
                    for (var i = 0; i < elm.style.length; i++) {
                        str += elm.style[i] + ":" + elm.style[elm.style[i]] + ";";
                    }
                    elm.style = str + style + ":" + value + ";";
                });
            } else if (typeof style === "object") {
                each(style, function(key, val) {
                    str += key + ":" + val + ";";
                });

                this.each(function(elm, i) {
                    for (var i = 0; i < elm.style.length; i++) {
                        str2 += elm.style[i] + ":" + elm.style[elm.style[i]] + ";";
                    }
                    elm.style.cssText = str2 + str;
                });

            }
            return this;
        },
        // css: function(style, val) {
        //     var str = "";
        //     if (typeof style === 'string' && val) { //传入了2个参数 并且第一个是字符串
        //         this.each(function(elm, i) { //遍历每一个元素
        //             elm.style = style + ":" + val + ";";
        //         });
        //     } else if (typeof style === 'object') {
        //         each(style, function(key, value) {
        //             // 遍历对象 拼接字符串
        //             str += key + ':' + value + ';';
        //         });
        //         this.each(function(elm, i) { //遍历每一个元素
        //             // 给每一个元素设置样式
        //             elm.style = str;
        //         });
        //         // console.log(str);
        //     }
        //     return this; // 链式调用
        // },
        addClass: function(className) {
            this.each(function(elm, i) {
                elm.classList.add(className);
            });
            return this;
        },
        removeClass: function(className) {
            this.each(function(elm, i) {
                elm.classList.remove(className);
            });
            return this;
        },
        index: function(elm) {
            m
            var arr = Array.from(this);
            return arr.findIndex((el, index) => el == elm);

            // var index = arr.findIndex(function(el, index) {
            //     // findIndex函数 会遍历整个数组
            //     // 在回调函数中的第一个参数返回的是遍历的元素，
            //     // 第二个参数是遍历元素所对应的下标
            //     return el == elm; // 返回匹配元素相等情况下 所对应的数组中的索引值
            // });
            // return index;
        },
        tabs: function(options) {
            var defaults = { // 默认参数
                ev: 'click',
                actived: 'actived',
                show: 'show'
            };
            Object.assign(defaults, options); // 合并参数
            var btns = $('ul>li', this[0]); // 选择到所有的按钮
            var oDiv = $('div[data-type="tabs"]', this[0]); //选择到要切换的DIV

            btns.on(defaults.ev, function() {
                var index = btns.index(this); //获得到点击按钮的索引
                btns.removeClass(defaults.actived); // 移除所有的按钮的类名
                $(this).addClass(defaults.actived); // 为当前点击的按钮添加类名

                // 我们怎么知道我们点的是第几个按钮？？？  想知道下标  找下标
                oDiv.removeClass(defaults.show);
                $(oDiv[index]).addClass(defaults.show);
            });
        },
        animate: function(style, callback) {
            // 想要改变元素的位置 获得当前的位置(样式)
            // 需要目标位置(样式)
            this.each(function(elm, i) {
                elm.timer = setInterval(function() {
                    var flag = true; //开关，当开关为true时 才可以停止动画
                    var current = 0; //当前位置

                    for (var attr in style) {
                        if (attr === 'opacity') {
                            current = Math.ceil(getStyle(elm, style) * 100);
                        } else {
                            current = parseInt(getStyle(elm, attr));
                        }

                        var speed = (style[attr] - current) / 10;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                        if (current != style[attr]) {
                            // 没有到达目标
                            flag = false;
                        }

                        if (attr === 'opacity') {
                            elm.style[attr] = (current + speed) / 100;
                            elm.style.filter = 'alpha(opacity=' + (current + speed) + ')';
                        } else {
                            elm.style[attr] = current + speed + 'px';
                        }
                    }

                    if (flag) {
                        clearInterval(elm.timer);
                        callback && callback();
                    }
                }, 30);
            });
        },
        html: function(html) { //设置html内容
            if (typeof html === 'function') {
                this.each(function(elm, i) {
                    elm.innerHTML = html(elm.innerHTML, i);
                });
            } else {
                this.each(function(elm, i) {
                    elm.innerHTML = html;
                });
            }
        },
        offset: function() {
            // 获取第一个元素的 offset值
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop,
                width: this[0].offsetWidth,
                height: this[0].offsetHeight
            }
        }
    }


    function each(obj, callback) {
        for (var i in obj) {
            callback(i, obj[i]);
        }
    }

    function ready(callback) {
        if (document.addEventListener) {
            // DOMContentLoaded 事件来自HTML5 IE不支持
            // DOM结构加载完毕就执行
            document.addEventListener('DOMContentLoaded', function() {
                // 移除事件
                document.removeEventListener('DOMContentLoaded', arguments.callee);
                callback();
            });
        } else if (document.attachEvent) {
            // 兼容ie 就绪事件
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState == 'complete') {
                    document.detachEvent('onreadystatechange', arguments.callee);
                    callback();
                }
            });
        }
    }

    // 获得计算后样式
    function getStyle(elm, style) {
        if (elm.currentStyle) {
            return elm.currentStyle[style];
        } else {
            return getComputedStyle(elm)[style];
        }
    }

    window.$ = window.base = base;
    // window.ready = ready;
})();
//老彭的
//1.随机数的方法
// function rannum(min, max) {
//     return Math.round(Math.random() * (max - min)) + min;
// }
// //2.自定义函数
// function double(n) {
//     return n < 10 ? '0' + n : n;
// }
// //3.兼容获取任意的css属性的值
// function getstyle(obj, attr) {
//     if (window.getComputedStyle) {
//         return getComputedStyle(obj)[attr];
//     } else {
//         return obj.currentStyle[attr];
//     }
// }
// //4.事件绑定的方法
// function addEvent(obj, etype, fn) {
//     if (obj.addEventListener) {
//         obj.addEventListener(etype, fn, false);
//     } else {
//         obj.attachEvent('on' + etype, fn);
//     }
// }

// function removeEvent(obj, etype, fn) {
//     if (obj.removeEventListener) {
//         obj.removeEventListener(etype, fn, false);
//     } else {
//         obj.detachEvent('on' + etype, fn);
//     }
// }
// //5.缓冲运动
// function buffermove(obj, json, fn) {
//     clearInterval(obj.timer);
//     var speed = 0;
//     obj.timer = setInterval(function() {
//         var flag = true;
//         for (var attr in json) {
//             //1.取当前值
//             var cssvalue = null;
//             if (attr === 'opacity') {
//                 cssvalue = Math.round(getstyle(obj, attr) * 100);
//             } else {
//                 cssvalue = parseInt(getstyle(obj, attr));
//             }
//             //2.求速度
//             speed = (json[attr] - cssvalue) / 5;
//             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//             //3.运动的判断
//             if (cssvalue !== json[attr]) {
//                 if (attr === 'opacity') {
//                     obj.style.opacity = (cssvalue + speed) / 100;
//                     obj.style.filter = 'alpha(opacity=' + (cssvalue + speed) + ')';
//                 } else {
//                     obj.style[attr] = cssvalue + speed + 'px';
//                 }
//                 flag = false;
//             }
//         }
//         if (flag) {
//             clearInterval(obj.timer);
//             fn && typeof fn === 'function' && fn();
//         }
//     }, 10);
//     //求任意css值。
//     function getstyle(obj, attr) {
//         if (window.getComputedStyle) {
//             return getComputedStyle(obj)[attr];
//         } else {
//             return obj.currentStyle[attr];
//         }
//     }
// }
// //6.ajax函数封装
// function ajax(obj) {
//     let ajax = new XMLHttpRequest();
//     obj.type = obj.type || 'get';
//     if (!obj.url) {
//         throw new Error('接口地址不存在');
//     }

//     function objToString(obj) {
//         let arr = [];
//         for (let attr in obj) {
//             arr.push(attr + '=' + obj[attr]);
//         }
//         return arr.join('&');
//     }
//     if (obj.data) {
//         if (typeof obj.data === 'object' && !Array.isArray(obj.data)) {
//             obj.data = objToString(obj.data);
//         } else {
//             obj.data = obj.data;
//         }
//     }
//     if (obj.data && obj.type === 'get') {
//         obj.url += '?' + obj.data;
//     }
//     if (obj.async === 'false' || obj.async === false) {
//         obj.async = false;
//     } else {
//         obj.async = true;
//     }
//     ajax.open(obj.type, obj.url, obj.async);
//     if (obj.data && obj.type === 'post') {
//         ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//         ajax.send(obj.data);
//     } else {
//         ajax.send();
//     }
//     if (obj.async) {
//         ajax.onreadystatechange = function() {
//             if (ajax.readyState === 4) {
//                 if (ajax.status === 200) {
//                     let apidata = ajax.responseText;
//                     if (obj.dataType === 'json') {
//                         apidata = JSON.parse(apidata)
//                     }
//                     obj.success && typeof obj.success === 'function' && obj.success(apidata);
//                 } else {
//                     obj.error && typeof obj.error === 'function' && obj.error('接口地址有误' + ajax.status);
//                 }
//             }
//         }
//     } else {
//         obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);
//     }
// }
// //7.cookie添加，获取，删除
// function addcookie(key, value, day) {
//     let date = new Date();
//     date.setDate(date.getDate() + day);
//     document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
// }

// function getcookie(key) {
//     let arr = decodeURIComponent(document.cookie).split('; ');
//     for (let value of arr) {
//         let newarr = value.split('=');
//         if (key === newarr[0]) {
//             return newarr[1];
//         }
//     }
// }

// function delcookie(key) {
//     addcookie(key, '', -1);
// }