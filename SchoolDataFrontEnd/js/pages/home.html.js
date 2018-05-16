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
                    
            }, {//获取index页面传递的用户名信息进行显示
                id: "user_name",
                xtype: "container",
                html: "<a href='#' class='userName'>" + decodeURI(window.location.search.substr(1).split('=')[1])+"</a>",
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
                    id:'label_all',
                    html: "<a href='#' class='classify'>所有文件</a> ",
                    listeners: {
                        render: function () {//渲染后添加click事件
                            Ext.fly(this.el).on('click',
                                function (e, t) {
                                    console.log("11111");
                                    searchResourceAccordingForm("");
                                });
                        },
                    }
                }, {
                        html: "<a href='#' class='classify'>视频</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        searchResourceAccordingForm("视频");
                                    });
                            },
                        }
                    }, {
                        html: "<a href='#' class='classify'>音频</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        searchResourceAccordingForm("音频");
                                    });
                            },
                        }
                    }, {
                        html: "<a href='#' class='classify'>图片</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        searchResourceAccordingForm("图片");
                                    });
                            },
                        }
                    }, {
                        html: "<a href='#' class='classify'>文档</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        searchResourceAccordingForm("文档");
                                    });
                            },
                        }
                    }, {
                        html: "<a href='#' class='classify'>表格</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        searchResourceAccordingForm("表格");
                                    });
                            },
                        }
                    }, {
                        html: "<a href='#' class='classify'>其它</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        searchResourceAccordingForm("其它");
                                    });
                            },
                        }
                    }, {
                        html: "<a href='#' class='classify'>分类检索</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        var _userName = decodeURI(window.location.search.substr(1).split('=')[1]);
                                        window.location = "search.html?userName=" + _userName;
                                    });
                            },
                        }
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
                    width: '100%',
                    border: false,
                    items: [{
                        id: 'btn_upload',
                        xtype: 'button',
                        text: '上传',
                        margin: '10px 0 10px 20px',
                        style: 'background:#35BAF6;',
                        height: 32,
                        width: 77,
                        border: false,
                        glyph: 0xf0aa,
                        listeners: {//弹出文件上传窗口
                            click: function () {
                                if (!Ext.getCmp('uploadWindow')) {    //）判断是否存在该组件  
                                    Ext.create('Ext.window.Window', {
                                        id: 'uploadWindow',
                                        height: 200,
                                        width: 500,
                                        items: [{
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [{
                                                xtype: 'filefield',
                                                name: '文件',
                                                fieldLabel: '文件',
                                                labelWidth: 50,
                                                msgTarget: 'side',
                                                allowBlank: false,
                                                width: 400,
                                                buttonText: '浏览',
                                                margin: '30px',
                                            }, {
                                                xtype: 'panel',
                                                height: 40,
                                                width: 500,
                                                layout: 'hbox',
                                                bodyStyle: 'background:#f0f0f0',
                                                margin: '18px 0 0 0',
                                                border: false,
                                                items: [{
                                                    xtype: 'button',
                                                    text: '提交',
                                                    height: 30,
                                                    width: 72,
                                                    margin: '6px 8px 6px 400px',
                                                }]
                                            }]
                                        }]
                                    }).show();
                                }
                            }
                        }
                    }, {
                            xtype: 'button',
                            text: '下载',
                            margin: '10px 0 10px 10px',
                            style: 'background:#35BAF6;textColor:#ffffff',
                            height: 32,
                            width: 77,
                            border: false,
                            glyph: 0xf0ab,
                        }, {
                        xtype: 'button',
                        text: '新建文件夹',
                        margin: '10px 0 10px 10px',
                        style: 'background:#35BAF6;textColor:#ffffff',
                        height: 32,
                        width: 112,
                        border: false,
                        glyph: 0xf044,
                    }, {
                        xtype: 'container',
                        flex: 1
                    }, {
                        id: 'txt_search',
                        xtype: 'textfield',
                        emptyText: '请输入关键字',
                        margin: '10px 10px 10px 0',
                        allowBlank:true,
                    }, {
                        xtype: 'button',
                        width: 25,
                        height: 25,
                        glyph: 0xf002,
                        margin: '14px 10px 10px 3px',
                        listeners: {
                            click: function () {
                                console.log("123");
                                var keyword = Ext.getCmp("txt_search").getValue();
                                searchResourceAccordingKeyWord(keyword);

                            }
                        }
                        }
                    ]

                },{//默认显示没有数据的背景图
                        id: 'image_no_data',
                        xtype: 'image',
                        width: 200,
                        height: 200,
                        src: 'images/no_data.png',
                        style: 'margin:150px 250px 300px 500px',
                    }, , {//资源显示区
                    xtype: 'container',
                    width: "100%",
                    height: "100%",
                    layout: 'vbox',
                    items: [{
                            id: 'grid_resource_item',
                            xtype: 'grid',
                            width: "100%",
                            height: "100%",
                            border: false,
                            store: resource,
                            columns: [
                                {
                                    text: "文件名",
                                    dataIndex: 'name',
                                    width: 100,
                                    border: false,
                                },
                                {
                                    text: "大小",
                                    dataIndex: 'size',
                                    width: 100,
                                    border: false,
                                },
                                {
                                    text: "上传日期",
                                    dataIndex: 'time',
                                    width:100,
                                    border: false,
                                },
                            ],
                            forceFit: true,
                            split: true,
                        }]
                }]
                
        }]
    })
 
}

function searchResourceAccordingForm(formName) {
    common.api({
        url: "Resource/SearchResourceAccordingForm",
        type: "Get",
        params: {
            formName: formName,
        },
        fn: function (res) {
            if (res.state) {
                console.log(res);
                var _resource = [];
                res.result.forEach(function (item) {
                    _resource.push({
                        name: item.Name,
                        size: item.Size,
                        time: item.CreateTime,
                    })
                })
                resource.setData(_resource);
                Ext.getCmp("image_no_data").hide();
            } 
        }
    })
}


function searchResourceAccordingKeyWord(keyword) {
    common.api({
        url: "Resource/SearchResourcrAccordingKeyWord",
        type: "Get",
        params: {
            keyword: keyword,
        },
        fn: function (res) {
            if (res.state) {
                console.log(res);
                var _resource = [];
                res.result.forEach(function (item) {
                    _resource.push({
                        name: item.Name,
                        size: item.Size,
                        time: item.CreateTime,
                    })
                })
                resource.setData(_resource);
                Ext.getCmp("image_no_data").hide();
            } 
        }
    })
}

var resource = Ext.create('Ext.data.Store', {
    fields: ['name', 'size', 'time'],
    pageSize: 20, 
    autoLoad: true
});
