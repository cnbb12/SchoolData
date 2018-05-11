Ext.onReady(function () {
    init();
});
function init() {
    Ext.setGlyphFontFamily('FontAwesome');//简化使用FontAwesome字体图标
    Ext.create('Ext.container.Viewport', {
        layout: "border",
        items: [{
            xtype: "container",
            style: 'background-color:#35BAF6',
            layout:"hbox",
            region: "north",
            height: 60,
            items: [{
                xtype: "image",
                src: "images/logo.png",
                width: 60,
                height: 60,
                margin:'auto 0px auto 30px',
            }, {
                    xtype: "label",
                    html: "<div style=';color:white;font-family:微软雅黑;font-size:20pt;line-height:60px;'>教学资源库系统</div>",
                    margin: 'auto 0px auto 10px'
                }, {
                    xtype: "container",
                    flex: 1,
                }, {
                    id:"user_icon",
                    xtype: "image",
                    src: "images/user_icon.png",
                    height: 60,
                    width: 60
                }, {
                    id: "user_name",
                    xtype: "label",
                    html: "<div style=';color:white;font-family:微软雅黑;font-size:10pt;line-height:60px;'>用户名</div>",
                    margin: 'auto 0px auto 10px',
                }]
        }]
    })
}
