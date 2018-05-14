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
            layout: "hbox",
            region: "north",
            height: 60,
            items: [{//north
                xtype: "image",
                src: "images/logo.png",
                width: 40,
                height: 40,
                margin: '10px 0px auto 30px',
                }, {
                xtype: "label",
                html: "<div style=';color:white;font-family:微软雅黑;font-size:15pt;line-height:60px;'>教学资源库系统</div>",
                margin: 'auto 0px auto 10px'
            }, {
                xtype: "container",
                flex: 1,
                }, {
                id: "user_icon",
                xtype: "image",
                src: "images/user_icon.png",
                height: 50,
                    width: 50,
                style:'margin-top:10px'
                    
            }, {
                id: "user_name",
                xtype: "container",
                    html: "<a href='#' class='userName'>用户名</a>",
                cursor: 'pointer',
                style: 'margin:25px 30px 0px 10px',
                }]
        }, {//west
                xtype: 'panel',
                layout: 'vbox',
                region: 'west',
                border: false,
                width: 180,
                bodyStyle: 'background:#F0FFFF;',
                defaults: {
                    xtype: 'label',
                    height: 50,
                    width: 180,                    
                },
                items: [{
                    html: "<a href='#' class='classify'>所有文件</a> "
                }, {
                        html: "<a href='#' class='classify'>视频</a>",
                    }, {
                        html: "<a href='#' class='classify'>音频</a>",
                    }, {
                        html: "<a href='#' class='classify'>图片</a>",
                    }, {
                        html: "<a href='#' class='classify'>文档</a>",
                    }, {
                        html: "<a href='#' class='classify'>表格</a>",
                    }, {
                        html: "<a href='#' class='classify'>其它</a>",
                }],
        },{//center
                xtype: 'container',
                region: 'center',
                flex: 1,
                layout:'vbox',
                style: 'background-color:#ffffff',
                items: [{//资源显示区正上方的工具区
                    xtype: 'panel',
                    layout: 'hbox',
                    height: 58,
                    width:'100%',
                    border: false,
                    items: [{
                        xtype: 'button',
                        text: '上传',
                        margin: '10px 0 10px 20px',
                        style: 'background:#35BAF6',
                        height: 32,
                        width: 77,
                        border: false,
                        glyph: 0xf0aa,
                    }, {
                            xtype: 'button',
                            text: '新建文件夹',
                            margin: '10px 0 10px 10px',
                            style: 'background:#35BAF6',
                            height: 32,
                            width: 112,
                            border: false,
                            glyph: 0xf044,
                        }, {
                            xtype: 'container',
                            flex: 1
                        }, {
                            xtype: 'textfield',
                            emptyText: '请输入关键字',
                            margin: '10px 10px 10px 0',
                            fieldStyle: {
                                background: '#fff url(images/search.png) no-repeat right center',
                                paddingLeft: '10px',
                            }
                        }
                    ]

                }]
                
        }]
    })
}