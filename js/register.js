$(() => {
    // 手机正则验证
    var regtel = /^1[3456789]\d{9}$/;
    // qq正则验证
    var regqq = /[1-9][0-9]{4,}/;
    // 昵称正则验证
    var regnc = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
    // 验证码正则验证
    var regmsg = /^\d{6}$/;
    // 密码正则验证
    var regpwd = /^[a-zA-Z]\w{5,17}$/;
    // 强中弱密码
    var qiang = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/;
    var zhong = /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/;
    var ruo = /(?=.{6,}).*/;

    function regExp(ele, reg) {
        ele.on('blur', function() {
            if ($.trim($(this).val()) == "") {
                ele.next().removeClass().addClass('error').html("<i class='error_icon'></i>\t请输入内容");;
            } else if (reg.test($(this).val())) {
                ele.next().removeClass().addClass('success').html("<i class='success_icon'></i>\t恭喜您输入正确");
            } else {
                ele.next().removeClass().addClass('error').html("<i class='error_icon'></i>\t格式不正确，请重新输入");;
            }
        })
    }
    // 确认密码验证
    $('#surepwd').on('blur', function() {
        if ($.trim($(this).val()) == "") {
            $('#surepwd').next().removeClass().addClass('error').html("<i class='error_icon'></i>\t请输入内容");;
        } else if ($(this).val() == $('#pwd').val()) {
            $(this).next().removeClass().addClass('success').html("<i class='success_icon'></i>\t恭喜您输入正确");
        } else {
            $(this).next().removeClass().addClass('error').html("<i class='error_icon'></i>\t俩次密码输入不一致，请重新输入");;
        };
    });
    // 强中弱密码判断
    $('#pwd').on('blur', function() {
        if (qiang.test($(this).val())) {
            $('.qiang').addClass('liang');
            $('.qiang').siblings().removeClass('liang');
        } else if (zhong.test($(this).val())) {
            $('.zhong').addClass('liang');
            $('.zhong').siblings().removeClass('liang');
        } else if (ruo.test($(this).val())) {
            $('.ruo').addClass('liang');
            $('.ruo').siblings().removeClass('liang');
        };
    })

    regExp($('#tel'), regtel);
    regExp($('#qq'), regqq);
    regExp($('#nc'), regnc);
    regExp($('#msg'), regmsg);
    regExp($('#pwd'), regpwd);

    // 阻止提交默认事件
    // $('.over').click(function(e) {
    //     e.preventDefault();
    //     if (!($('.agree>input').is(":checked"))) {
    //         alert('请查看协议并勾选')
    //     }
    // })
    $('#rgs_form').on('submit', function() {
        if (!($('.agree>input').is(":checked"))) {
            alert('请查看协议并勾选')
        }
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '',
            data: formData,
            success: function(responds) {
                if (responds == 0) {
                    alert('手机号已经存在');
                } else if (responds == 1) {
                    location.reload();
                }
            },
            error: function() {
                alert('注册失败')
            }

        })

        return false;
    })
});