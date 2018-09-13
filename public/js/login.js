var login = {
    checkLogin : function(){
        if(getCookie("uuid")){
            //登录状态
            return true;
        }else {
            return false;
        }
    },
    /**
     * 登录点击 显示登录框
     */
    loginClk:function(){
        $(".login-btn").click(function(event){
            $(".cover").show();
            $(".dialog-login-register").show();
            event.stopPropagation();
            event.preventDefault();
        })
    },
    /**
     * 关闭登录弹窗
     */
    loginClose:function(){
        $(".login-close").click(function(event){
            $(".cover").hide();
            $(".dialog-login-register").hide();
            event.stopPropagation();
            event.preventDefault();
        })
    },
    //输入框值改变，判断是否需要报错
    formChange:function(){
        $(".username").keyup(function(event){
            if("" != event.target.value){
                $(".username").parent().find(".form-error").hide();
            }
        });
        $(".password").keyup(function(event){
            if("" != event.target.value){
                $(".password").parent().find(".form-error").hide();
            }
        })
        $(".rePassword").keyup(function(event){
            if("" != event.target.value){
                $(".rePassword").parent().find(".form-error").hide();
            }
        })
    },
    /**
     * 登录按钮点击
     */
    loginSubmit:function(){
        var _this = this;
        $(".login-form-btn").click(function(){
            if(validate()){
                //登录
                var params = {
                    username : $("#username").val(),
                    password : $("#password").val()
                }
                $.post("/users/login",params,function(res){
                    if( "0" == res.code ){
                        layer.alert("登录成功");
                        _this.hideModal();
                        setCookie("username",res.content.username,10);
                        setCookie("name",res.content.name,10);
                        setCookie("email",res.content.email,10);
                        setCookie("uuid",res.content.uuid,10);
                        setCookie("headUrl",res.content.headUrl,10)
                        setCookie("token",res.content.token,10);
                        //显示登录后信息
                        $(".login-out").show();//显示登录之后的信息
                        $(".login-in").hide();//隐藏登录信息
                        $("#name").text(res.content.name);
                        $(".head-img").attr("src",res.content.headUrl);
                    }else{
                        layer.alert(res.message);
                    }
                })
            }
        })
        function validate(){
            var flag = true;
            if("" == $("#username").val().trim()){
                //用户名不能为空
                $("#username").parent().find(".form-error").show();
                $("#username").parent().find(".form-error").find(".error-txt").text("用户名不能为空");
                flag = false;
                //密码不password能为空
            }
            if("" == $("#password").val().trim()){
                //密码不能为空
                $("#password").parent().find(".form-error").show();
                $("#password").parent().find(".form-error").find(".error-txt").text("用户名不能为空");
                flag = false;
            }
            return flag;
        }
    },
    registerSubmit:function(){
        var _this = this;
        $(".register-form-btn").click(function(){
            if(validate()){
                var params = {
                    name : $("#r-name").val(),
                    username : $("#r-username").val(),
                    password : $("#r-password").val(),
                    email : $("#r-email").val()
                }
                $.post("/users/register",params,function(res){
                    if("0" == res.code){
                        layer.alert("注册成功");
                        _this.hideModal();
                    }
                })
            }
        })
        function validate(){
            var flag = true;
            if("" == $("#r-username").val().trim()){
                //用户名不能为空
                $("#r-username").parent().find(".form-error").show();
                $("#r-username").parent().find(".form-error").find(".error-txt").text("用户名不能为空");
                flag = false;
                //密码不password能为空
            }
            if("" == $("#r-password").val().trim()){
                //密码不能为空
                $("#password").parent().find(".form-error").show();
                $("#password").parent().find(".form-error").find(".error-txt").text("用户名不能为空");
                flag = false;
            }
            if($("#r-password").val().trim() != $("#r-re-password").val().trim()){
                $("#r-re-password").parent().find(".form-error").show();
                $("#r-re-password").parent().find(".form-error").find(".error-txt").text("两次输入的密码不相同");
                flag = false;
            }
            return flag;
        }
    },
    /**
     * 关闭弹窗
     */
    hideModal:function(){
        $(".cover").hide();
        $(".dialog-login-register").hide();
    },
    /**
     * 切换 注册 / 登录
     */
    tapChange:function(){
        $(".tap-register").click(function(){
            $(".login-dialog").removeClass("active");
            $(".register-dialog").addClass("active");
            $(".dialog-login-register").animate({height:"500px"});
        })
        $(".tap-login").click(function(){
            $(".login-dialog").addClass("active");
            $(".register-dialog").removeClass("active");
            $(".dialog-login-register").animate({height:"300px"});
        })
    },
    /**
     * 退出 
     */
    logout: function(){
        $("#log-out").click(function(){
            layer.confirm("您确定要退出吗？",{
                btn:["确定","取消"]
            },function(){
                //退出
                clearCookie();
                $(".login-out").hide();
                $(".login-in").show();
                layer.msg("退出成功！");
            },function(){
                //取消
            })
        })
    },
    /**
     * 初始化
     */
    init:function(){
        this.loginClk();
        this.loginClose();
        this.loginSubmit();
        this.formChange();
        this.tapChange();
        this.registerSubmit();
        this.logout();
    }
}
$(function(){
    login.init();
    if(login.checkLogin()){
        $(".login-out").show();//显示登录之后的信息
        $(".login-in").hide();//隐藏登录信息
        $("#name").text(getCookie("name"));
        $(".head .head-img").attr("src",getCookie("headUrl"))
    }else{
        $(".login-out").hide();
        $(".login-in").show();
    }
})