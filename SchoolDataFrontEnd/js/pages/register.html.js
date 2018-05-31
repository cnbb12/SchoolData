Ext.onReady(function (){
    init();
})

function init() {
    Ext.setGlyphFontFamily('FontAwesome');//简化使用FontAwesome字体图标
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            xtype: "container",
            region: 'center',
            style: {
                backgroundImage: 'url(images/register_background.jpg)',
                backgroundSize: "cover"
            },
            items: [{//中间填写用户信息的panel
                xtype: "panel",
                width: 400,
                style: "margin:150px auto 0px auto;",
                layout: "vbox",
                bodyStyle: "padding:15px;",
                defaults: {
                    xtype: "textfield",
                    height: 45,
                    width: "100%"
                },
                items: [{
                    xtype: "label",
                    html: "<div style='text-align:center;color:blank;font-family:微软雅黑;font-size:14pt;line-height:45px;'>用户注册</div>",
                    width: "100%",
                },{
                        id: "txt_user_name",
                        emptyText: "用户名",
                        style: 'margin-top:30px',
                    }, {
                    id: "txt_phone",
                    emptyText: "注册电话",
                }, {
                    id: "txt_key",
                    emptyText: "密码",
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() == Ext.EventObject.ENTER) {
                                var userName = Ext.getCmp("txt_user_name").getValue();
                                var userPhone = Ext.getCmp("txt_phone").getValue();
                                var password = Ext.getCmp("txt_key").getValue();
                                register(userName, userPhone, password);
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        id: "txt_check_code",
                        xtype:'textfield',
                        emptyText: "验证码",
                        width: 240,
                        height: 45,
                    },{
                            id: 'btn_get_check_code',
                            xtype:'button',
                            text: '获取验证码',
                            width: 100,
                            height:45,
                            style: "margin-left:28px",
                    }]
                    },{
                    id: 'label_error_message',
                    xtype: 'label',
                    hidden: true,
                    height: 25,
                    cls: 'errorMessage',
                    style: "margin:5px 0 0 2px",
                }, {
                    xtype: 'button',
                    id: 'btn_login',
                        text: '注册',
                        style: "margin:50px 0 0 2px",
                    handler: function () {
                        var userName = Ext.getCmp("txt_user_name").getValue();
                        var userPhone = Ext.getCmp("txt_phone").getValue();
                        var password = Ext.getCmp("txt_key").getValue();
                        register(userName, userPhone, password);
                    }
                }]
            }]
        }]
    })
}

function register(username, userphone, password) {
    common.api({
        url: "User/AddUser",
        type: "Post",
        params: {
            userName: username,
            phoneNumber: userphone,
            key: password,
        },
        fn: function (res) {
            console.log(res);
            if (res.state) {
                aler.show("注册成功，请进入登录页面");
                Ext.getCmp("label_error_message").hide();
                window.location = "index.html";
            } else {
                errorMessage = res.msg;
                Ext.getCmp("label_error_message").setText(errorMessage);
                Ext.getCmp("label_error_message").show();
            }
        }
    })
}