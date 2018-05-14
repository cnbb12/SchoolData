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

                width: 60,
                height: 60,
                margin: 'auto 0px auto 30px',
                }, {
                xtype: "label",
                html: "<div style=';color:white;font-family:微软雅黑;font-size:20pt;line-height:60px;'>教学资源库系统</div>",
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
                html: "<a href='#';>用户名</a>",
                cursor: 'pointer',
                style: 'margin:25px 30px 0px 10px',
                }]
        }, {//west
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
                items: [{
                    title: '资源格式',
                    items: [{
                        text: '视频'
                    }, {
                        text: '音频'
                    }, {
                        text: '图片'
                    }, {
                        text: '文档'
                    }, {
                        text: '表格'
                    }, {
                        text: '其他'
                    }]

                }, {
                    title: '资源类型',
                    items: [{
                        text: '课件'
                    }, {
                        text: '教案'
                    }, {
                        text: '习题'
                    }, {
                        text: '作业'
                    }, {
                        text: '活动'
                    }, {
                        text: '考试'
                    }, {
                        text: '其他'
                    }],
                },{
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
                    }],
                },{
                        title: '学科',
                        xtype: 'panel',
                        layout: 'vbox',
                        items: [{
                            xtype: 'combobox',
                            fieldLabel: "学科",
                            labelWidth: 30,
                            store: subject,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'vaule',
                            store: clas,
                        }],
                    }],
        },{
                xtype: 'container',
                region: 'center',
                flex: 1,
                
        }]
    })
}

var clas = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data: [
        { "value": "1", "name": "1班" },
    ]
});
var grade = Ext.create('Ext.data.Store', {
    fields: ['name'],
    data: [
        { "value": "12020", "name": "初2020级" },
        { "value": "12019", "name": "初2019级" },
        { "value": "12018", "name": "初2018级" },
        { "value": "22020", "name": "高2020级" },
        { "value": "22019", "name": "高2019级" },
        { "value": "22018", "name": "高2018级" },
    ]
});
var subject = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data: [
        { "value": "Chinese", "name": "语文" },
        { "value": "Math", "name": "数学" },
        { "value": "English", "name": "英语" },
        { "value": "physics", "name": "物理" },
        { "value": "Chemistry", "name": "化学" },
        { "value": "Biology", "name": "生物" },
        { "value": "Politics", "name": "政治" },
        { "value": "History", "name": "历史" },
        { "value": "Geography", "name": "地理" },
        { "value": "Music", "name": "音乐" },
        { "value": "PE", "name": "体育" },
        { "value": "Art", "name": "美术" },
        { "value": "Computer", "name": "计算机" },
        { "value": " Psychological", "name": "心理" },
    ]
});

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
            } else {
                Ext.Msg.show({
                    title: "操作失败。",
                    msg: res.msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        }
    })
}
