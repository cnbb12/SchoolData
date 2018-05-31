Ext.onReady(function () {
    checkLogin();
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
                html: "<a href='#' class='userName'>" + window.localStorage.getItem('userName')+ "</a>",
                cursor: 'pointer',
                style: 'margin:25px 30px 0px 10px',
                }]
        }, {//west左侧资源格式区
                xtype: 'panel',
                layout: 'vbox',
                region: 'west',
                border: false,
                width: 180,
                bodyStyle: 'background:#F0FFFF;',
                defaults: {
                    xtype: 'label',
                    border: false,
                    height: 50,
                    width: 180, 
                    cls: 'classify',

                },
                items: [{
                    id:'label_all',
                    html: "<a class='classify'>所有文件</a>",
                    listeners: {
                        render: function () {//渲染后添加click事件
                            Ext.fly(this.el).on('click',
                                function (e, t) {
                                    console.log("11111");
                                    searchResourceAccordingForm();
                                });
                        },
                    }
                }, {
                        id: 'label_video',
                        html: "<a class='classify'>视频</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        //var formName = Ext.getCmp("label_video").getValue();
                                        searchResourceAccordingForm("视频");
                                    });
                            },
                        }
                    }, {
                        id: 'label_music',
                        html: "<a class='classify'>音频</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        //var formName = Ext.getCmp("label_music").text;
                                        searchResourceAccordingForm("音频");
                                    });
                            },
                        }
                    }, {
                        id: 'label_picture',
                        html: "<a class='classify'>图片</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        //var formName = Ext.getCmp("label_picture").html;
                                        searchResourceAccordingForm("图片");
                                    });
                            },
                        }
                    }, {
                        id: 'label_word',
                        html: "<a class='classify'>文档</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        //var formName = Ext.getCmp("label_word").html;
                                        searchResourceAccordingForm("文档");
                                    });
                            },
                        }
                    }, {
                        id: 'label_excel',
                        html: "<a class='classify'>表格</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        //var formName = Ext.getCmp("label_excel").getValue();
                                        //console.log(formName);
                                        searchResourceAccordingForm("表格");
                                    });
                            },
                        }
                    }, {
                        id: 'label_other',
                        html: "<a class='classify'>其它</a>",
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("11111");
                                        //var formName = Ext.getCmp("label_other").html;
                                        searchResourceAccordingForm("其它");
                                    });
                            },
                        }
                    }, {
                        text: "分类检索",
                        cls: 'classify',
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        window.location = "search.html";
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
                                            xtype: 'container',
                                            layout: 'vbox',
                                            items: [{
                                                id:"txtFile",
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
                                                id:'commit_pnl',
                                                xtype: 'container',
                                                height: 40,
                                                width: 500,
                                                layout: 'hbox',
                                                bodyStyle: 'background:#f0f0f0',
                                                margin: '18px 0 0 0',
                                                border: false,
                                                    items: [{
                                                        id:'label_upload_msg',
                                                        xtype: 'label',
                                                        //text: '文件上传成功',
                                                        width:100,
                                                        height: 30,
                                                        margin: '10px 8px 6px 30px',

                                                    }, {
                                                    xtype: 'button',
                                                    text: '提交',
                                                    height: 30,
                                                    width: 72,
                                                    margin: '6px 8px 6px 250px',
                                                    listeners: {
                                                        click: function () {
                                                            var fileEl = Ext.getCmp("txtFile").fileInputEl.dom;
                                                            var fd = new FormData();
                                                            fd.append("upfile", fileEl.files[0]);
                                                            var ajax = new XMLHttpRequest();
                                                            ajax.open("post", common.getApiRootUrl() + "/upload/Upload", true);
                                                            ajax.onreadystatechange = function () {
                                                                console.log(ajax.response);
                                                                var res = JSON.parse(ajax.response);
                                                                if (res.state) {
                                                                    Ext.getCmp("label_upload_msg").setText("文件上传成功")
                                                                } else {
                                                                    Ext.getCmp("label_upload_msg").setText(res.result);
                                                                }
                                                            };
                                                            ajax.send(fd);
                                                        }
                                                    }
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

//检测用户进入该页前是否已经登录，否则跳转到登录界面
function checkLogin() {
    var userName = window.localStorage.getItem('userName');
    if (!userName) {
        window.location = "index.html";
    }
}

///根据资源格式检索资源
function searchResourceAccordingForm(formName) {
    common.api({
        url: "Resource/SearchResourceAccordingForm",
        type: "Get",
        params: {
            formName: formName,
        },
        fn: function (res) {
            console.log("5555");
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

///根据关键字检索资源
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

//资源显示区的数据
var resource = Ext.create('Ext.data.Store', {
    fields: ['name', 'size', 'time'],
    pageSize: 20, 
    autoLoad: true
});
