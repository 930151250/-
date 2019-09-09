function ajax(obj) {
    let promise = new Promise(function (resolve, reject) {
        let ajax = new XMLHttpRequest();
        obj.type = obj.type || 'get';
        if (!obj.url) {
            throw new Error('接口地址不存在');
        }

        function objToString(obj) {
            let arr = [];
            for (let attr in obj) {
                arr.push(attr + '=' + obj[attr]);
            }
            return arr.join('&');
        }
        if (obj.data) {
            if (typeof obj.data === 'object' && !Array.isArray(obj.data)) {
                obj.data = objToString(obj.data);
            } else {
                obj.data = obj.data;
            }
        }
        if (obj.data && obj.type === 'get') {
            obj.url += '?' + obj.data;
        }
        if (obj.async === 'false' || obj.async === false) {
            obj.async = false;
        } else {
            obj.async = true;
        }
        ajax.open(obj.type, obj.url, obj.async);
        if (obj.data && obj.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(obj.data);
        } else {
            ajax.send();
        }
        if (obj.async) {
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        let apidata = ajax.responseText;
                        if (obj.dataType === 'json') {
                            apidata = JSON.parse(apidata)
                        }
                        resolve(apidata);
                        //obj.success && typeof obj.success === 'function' && obj.success(apidata);
                    } else {
                        reject('接口地址有误' + ajax.status)
                        //obj.error && typeof obj.error === 'function' && obj.error('接口地址有误' + ajax.status);
                    }
                }
            }
        } else {
            resolve(apidata);
            //obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);
        }
    });

    return promise;

}