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
            items: [{//north上方蓝色横条部分
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
                    style: 'margin-top:10px'

                }, {//从home页面获取用户名信息进行显示
                    id: "user_name",
                    xtype: "container",
                    html: "<a href='#' class='userName'>" + decodeURI(window.location.search.substr(1).split('=')[1]) + "</a>",
                    cursor: 'pointer',
                    style: 'margin:25px 30px 0px 10px',
                }]
        }, {//west左边索引分类栏
                xtype: 'container',
                layout: 'accordion',
                region: 'west',
                width:180,
                titleCollapse: false,
                animate: true,
                activeOnTop: true,
                defaults: {
                    bodyStyle: 'padding:15px',
                    background: '#87CEFF',
                    xtype: 'panel',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'label',
                        height: 40,
                        width: '100%',
                    }
                },
                items: [{//资源格式
                    title: '资源格式',
                    items: [{
                        id:'label_vedio',
                        text: '视频',
                        listeners: {
                            render: function () {//渲染后添加click事件
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("45");
                                        searchResourceAccordingForm("视频");
                                    });
                            },
                        }
                       
                    }, {
                            id:'label_music',
                            text: '音频',
                            listeners: {
                                render: function () {//渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("45");
                                            searchResourceAccordingForm("音频");
                                        });
                                },
                            }

                        }, {
                            id:'label_picture',
                            text: '图片',
                            listeners: {
                                render: function () {//渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("45");
                                            searchResourceAccordingForm("图片");
                                        });
                                },
                            }
                        }, {
                            id:'label_word',
                            text: '文档',
                            listeners: {
                                render: function () {//渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("45");
                                            searchResourceAccordingForm("文档");
                                        });
                                },
                            }
                        }, {
                            id:'label_excel',
                            text: '表格',
                            listeners: {
                                render: function () {//渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("45");
                                            searchResourceAccordingForm("表格");
                                        });
                                },
                            }
                        }, {
                            id:'label_other',
                            text: '其它',
                            listeners: {
                                render: function () {//渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("45");
                                            searchResourceAccordingForm("其它");
                                        });
                                },
                            }
                    }]

                }, {//资源类型
                    title: '资源类型',
                        items: [{
                        id:'label_kejian',
                        text: '课件',
                            listeners: {
                                render: function () {//渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("45");
                                            searchResourceAccordingType("课件");
                                        });
                                },
                            }
                        }, {
                            id:'label_jiaoan',
                            text: '教案',
                                listeners: {
                                    render: function () {//渲染后添加click事件
                                        Ext.fly(this.el).on('click',
                                            function (e, t) {
                                                console.log("45");
                                                searchResourceAccordingType("教案");
                                            });
                                    },
                                }
                            }, {
                                id:'label_xiti',
                            text: '习题',
                                listeners: {
                                    render: function () {//渲染后添加click事件
                                        Ext.fly(this.el).on('click',
                                            function (e, t) {
                                                console.log("45");
                                                searchResourceAccordingType("习题");
                                            });
                                    },
                                }
                            }, {
                                id:'label_zuoye',
                            text: '作业',
                                listeners: {
                                    render: function () {//渲染后添加click事件
                                        Ext.fly(this.el).on('click',
                                            function (e, t) {
                                                console.log("45");
                                                searchResourceAccordingType("作业");
                                            });
                                    },
                                }
                            }, {
                                id:'label_huodong',
                            text: '活动',
                                listeners: {
                                    render: function () {//渲染后添加click事件
                                        Ext.fly(this.el).on('click',
                                            function (e, t) {
                                                console.log("45");
                                                searchResourceAccordingType("活动");
                                            });
                                    },
                                }
                            }, {
                                id:'label_kaoshi',
                            text: '考试',
                                listeners: {
                                    render: function () {//渲染后添加click事件
                                        Ext.fly(this.el).on('click',
                                            function (e, t) {
                                                console.log("45");
                                                searchResourceAccordingType("考试");
                                            });
                                    },
                                }
                            }, {
                                id:'label_qita',
                                text: '其它',
                                listeners: {
                                    render: function () {//渲染后添加click事件
                                        Ext.fly(this.el).on('click',
                                            function (e, t) {
                                                console.log("45");
                                                searchResourceAccordingType("其它");
                                            });
                                    },
                                }
                    }],
                },{//年级
                    title: '年级',
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [{
                        id:'combo_grade',
                        xtype: 'combobox',
                        fieldLabel: "年级",
                        labelWidth:30,
                        store: grade,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'vaule',
                        editable:false,
                        listeners: {
                            select: function () {
                                console.log("123");
                                var grade = Ext.getCmp('combo_grade').getRawValue();
                                findClas(grade);
                            },
                            render: function () {
                                Ext.fly(this.el).on('click',
                                    function (e, t) {
                                        console.log("222");
                                        var grade = Ext.getCmp("combo_grade").getRawValue();
                                        var clas = Ext.getCmp("combo_clas").getRawValue();
                                        searchResourceAccordingGrade(grade,clas);
                                    })
                            }
                        }
                    }, {
                            id: 'combo_clas',
                            xtype: 'combobox',
                            fieldLabel: "班级",
                            labelWidth: 30,
                            store: clas,
                            autoLoad: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'vaule',
                            listeners: {
                                render: function () {
                                    Ext.fly(this.el).on('click',
                                        function (e, t) {
                                            console.log("2222222");
                                            var grade = Ext.getCmp("combo_grade").getRawValue();
                                            var clas = Ext.getCmp("combo_clas").getRawValue();
                                            searchResourceAccordingGrade(grade, clas);
                                        })
                                }
                            }
                    }],
                },{//学科
                        title: '学科',
                        xtype: 'panel',
                        items: [{
                            id:'combo_discpline',
                            xtype: 'combobox',
                            fieldLabel: "学科",
                            labelWidth: 30,
                            store: subjects,
                            queryMode: 'local',
                            displayField: 'subjectName',
                            listeners: {
                                click: function () {
                                    var discpline = Ext.getCmp("combo_discpline").getRawValue();
                                    searchResourceAccordingDiscipline(discpline);
                                }
                            }
                        }],
                }],
        },{//center
                xtype: 'container',
                region: 'center',
                flex: 1,
                layout: 'vbox',
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
                        text: '下载',
                        margin: '10px 0 10px 20px',
                        style: 'background:#35BAF6;',
                        height: 32,
                        width: 77,
                        border: false,
                        glyph: 0xf0ab,
                    }, {
                        xtype: 'container',
                        flex: 1
                    }, {
                        id: 'txt_search',
                        xtype: 'textfield',
                        emptyText: '请输入关键字',
                        margin: '10px 10px 10px 0',
                        allowBlank: true,
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

                }, {//资源显示区
                    xtype: 'container',
                    width: "100%",
                    height: "100%",
                    layout: 'vbox',
                        items: [{//默认显示没有数据的背景图
                            id:'image_no_data',
                            xtype: 'image',
                            width: 200,
                            height: 200,
                            src: 'images/no_data.png',
                            style:'margin:150px 250px 300px 500px',
                        }, {
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
                                width: 100,
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

//center区域显示的具体items的数据
var resource = Ext.create('Ext.data.Store', {
    fields: ['name', 'size', 'time'],
    pageSize: 20,
    autoLoad: true
});

//根据所选年级，显示的对应班级的数据（从后台获取）
var clas = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data: [
        { "value": "1", "name": "1班" },
    ]
});

//显示在左侧分类栏的年级数据
var grade = Ext.create('Ext.data.Store', {
    fields: ['value','name'],
    data: [
        { "value": "12020", "name": "初2020级" },
        { "value": "12019", "name": "初2019级" },
        { "value": "12018", "name": "初2018级" },
        { "value": "22020", "name": "高2020级" },
        { "value": "22019", "name": "高2019级" },
        { "value": "22018", "name": "高2018级" },
    ]
});
var subjects = Ext.create('Ext.data.Store', {
    fields: ['subjectName'],
    data: [
        { "subjectName": "语文" },
        { "subjectName": "数学" },
        { "subjectName": "英语" },
        { "subjectName": "物理" },
        { "nasubjectNameme": "化学" },
        { "subjectName": "生物" },
        { "subjectName": "政治" },
        { "subjectName": "历史" },
        { "subjectName": "地理" },
        { "subjectName": "音乐" },
        { "subjectName": "体育" },
        { "subjectName": "美术" },
        { "subjectName": "计算机" },
        { "subjectName": "心理" },
    ]
});

function searchResourceAccordingType(typeName) {
    common.api({
        url: "Resource/SearchResourceAccordingType",
        type: "Get",
        params: {
            typeName: typeName,
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

function searchResourceAccordingDiscipline(disciplineName) {
    common.api({
        url: "Resource/SearchResourceAccordingDiscpline",
        type: "Get",
        params: {
            discplineName: disciplineName,
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

function searchResourceAccordingGrade(grade,clas) {
    common.api({
        url: "Resource/SearchResourceAccordingGrade",
        type: "Get",
        params: {
            grade: grade,
            clas: clas,
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
                Ext.getCmp("image_no_data").hide();
            }
        }
    })
}

function findClas(grade) {
    common.api({
        url: "Grades/FindClas",
        type: "Get",
        params: {
            grade: grade,
        },
        fn: function (res) {
            console.log(res);
            console.log(grade);
            if (res.state) {
                var classes = [];
                res.result.forEach(function (item){
                    classes.push({
                        value: item.ClasID,
                        name:item.Clas,
                    })
                })
                clas.setData(classes);
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

