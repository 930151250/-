$(function() {
    const phone = document.querySelector('#phone');
    const oSpan = document.querySelector('span');

    console.log(phone);

    phone.onblur = function() {
        ajax({
            type: "post",
            url: 'http://localhost/js1907/huawei/src/lib/register.php',
            data: { //给后端
                checkphone: phone.value
            },
            success: function(d) {
                if (!d) {
                    oSpan.innerHTML = '√';
                    oSpan.style.color = 'green';
                } else {
                    oSpan.innerHTML = '该用户名已存在';
                    oSpan.style.color = 'red';
                }
            }
        })
    }
})