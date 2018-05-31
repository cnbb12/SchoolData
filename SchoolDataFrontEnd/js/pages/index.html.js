Ext.onReady(function () {
    init();
});
function init() {
    Ext.setGlyphFontFamily('FontAwesome');//简化使用FontAwesome字体图标
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
            //{
        //    xtype: "container",
        //    height: 45,
        //    style: "background-color:#35BAF6;",
        //    html: "<div style='text-align:center;color:white;font-family:微软雅黑;font-size:14pt;line-height:45px;'>请登录···</div>",
        //    region: 'north',
            //}, 
            {
            xtype: "container",
            region: 'center',
            style: {
                backgroundImage: 'url(images/login_background.jpg)',
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
                    text: "Sign into you account"
                }, {
                    id: "txtId",
                    emptyText: "User Id",
                    fieldStyle: {
                        background: '#fff url(images/user.png) no-repeat right center',
                        paddingLeft: '10px',
                    },
                }, {
                    id: "txtKey",
                    emptyText: "Password",
                    fieldStyle: {
                        background: '#fff url(images/key.png) no-repeat right center',
                        paddingLeft: '10px',
                        },
                        listeners: {
                            specialkey: function (field, e) {
                                if (e.getKey() == Ext.EventObject.ENTER) {
                                    var userName = Ext.getCmp("txtId").getValue(),
                                        password = Ext.getCmp("txtKey").getValue();
                                    checkLogin(this.up(), userName, password);
                                }
                            }
                        }
                    }, {
                        id:'label_error_message',
                        xtype: 'label',
                        hidden: true,
                        height:25,
                        cls: 'errorMessage',
                        style: "margin:5px 0 0 2px",
                    },{
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    items: [{
                        xtype: 'label',
                        id:'label_register',
                        html: "<a href='register.html'>注册新用户</a>",
                        style: "margin:5px 0 0 2px", 
                    }, {
                            xtype: "container",
                            flex: 1
                        }, {
                            xtype: "container",
                            html: "<a href='#'>forget Password?</a>",
                            style: "margin-top:8px;"
                        }]
                }, {
                        xtype: 'button',
                        id:'btn_login',
                        text: '登录',
                        handler: function () {                            
                            var userName = Ext.getCmp("txtId").getValue(),
                                password = Ext.getCmp("txtKey").getValue();
                            checkLogin(this.up(),userName, password);
                        }
                }]
            }]
        }]
    });
}

function checkLogin(box,userName, password) {
    if (userName == "" || password == "") {
        Ext.Msg.show({
            title: "系统提示您……",
            msg: "请输入您的用户名和登录口令后再执行本操作。",
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
        return;
    }
    box.el.mask("Logining...");
    common.api({
        url: "User/checkLogin",
        type: "Get",
        params: {
            userName: userName,
            key: password
        },
        fn: function (res) {
            box.el.unmask();
            console.log(res);
            if (res.state) {
                Ext.getCmp("label_error_message").hide();
                window.localStorage.setItem('userName', res.result.UserName);
                window.location = "home.html";
            } else {
                errorMessage = res.msg;
                Ext.getCmp("label_error_message").setText(errorMessage);
                Ext.getCmp("label_error_message").show();
            }
        }
    })
}