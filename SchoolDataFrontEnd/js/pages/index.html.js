Ext.onReady(function () {
    init();
});
function init() {
    Ext.setGlyphFontFamily('FontAwesome');//简化使用FontAwesome字体图标
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            xtype: "container",
            height: 45,
            style: "background-color:#35BAF6;",
            html: "<div style='text-align:center;color:white;font-family:微软雅黑;font-size:14pt;line-height:45px;'>请登录···</div>",
            region: 'north',
        }, {
            xtype: "container",
            region: 'center',
            style: {
                backgroundImage: 'url(images/lock-screen-background.jpg)',
                backgroundSize: "cover"
            },
            items: [{
                xtype: "panel",
                width: 400,
                style: "margin:80px auto 0px auto;",
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
                    }
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'checkbox_rememberMe',
                        boxLabel: 'Remenber Me',
                        value: 'Remenber Me',
                        checked: true
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
            if (res.state) {
                alert("登录成功，跳转页面。");
                window.location = "home.html";
            } else {
                Ext.Msg.show({
                    title: "登录失败。",
                    msg: res.msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        }
    })
}