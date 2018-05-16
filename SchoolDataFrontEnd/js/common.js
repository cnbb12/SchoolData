var api = "http://localhost:63676/";
var user;
var system = {
    loginCheck: function (module,callback,onlyCheck) {
        var userId=window.localStorage.getItem("userId");
        if(!userId){
            smas.needLogin();
        }else {
            return userId;
        }
    },
    needLogin: function () {
        //未登录时，提示动态登录信息
        var notice = "<div id='notice' style='margin:10px;border:1px solid white;padding:20px 10px 20px 20px;background-color:#007ACC;color:white;font-size:12px;width:280px;font-weight:bolder;'>未登录或登录超时，请重新登录(<span id='lblText'>3</span>)……</div>";
        document.write(notice);
        sh = setInterval(function () {
            if (document.getElementById("lblText").innerText != "0") {
                document.getElementById("lblText").innerText = parseInt(document.getElementById("lblText").innerText) - 1;
            } else {
                clearInterval(sh);
                if (window.parent) window.parent.location = "../../login.html";
                else window.location = "../../login.html";
            }
        }, 1000);
    }
};
var common = {
    getDate: function () {
        //获取当前的日期
        var myDate = new Date();
        return myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
    },
    getDate: function (cn) {
        //获取当前的日期
        var myDate = new Date();
        return myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日";
    },
    cancelBackSpace: function (e) {
        /*按backspace键时禁止浏览器后退,使用方法
        //禁止后退键 作用于Firefox、Opera
        document.onkeypress=cancelBackSpace;
        //禁止后退键  作用于IE、Chrome
        document.onkeydown=cancelBackSpace;
        */
        var ev = e || window.event;//获取event对象
        var obj = ev.target || ev.srcElement;//获取事件源

        var t = obj.type || obj.getAttribute('type');//获取事件源类型

        //获取作为判断条件的事件类型
        var vReadOnly = obj.getAttribute('readonly');
        var vEnabled = obj.getAttribute('enabled');
        //处理null值情况
        vReadOnly = (vReadOnly == null) ? false : vReadOnly;
        vEnabled = (vEnabled == null) ? true : vEnabled;

        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
        //并且readonly属性为true或enabled属性为false的，则退格键失效
        var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea")
            && (vReadOnly == true || vEnabled != true)) ? true : false;

        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
        var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
            ? true : false;

        //判断
        if (flag2) {
            return false;
        }
        if (flag1) {
            return false;
        }
    },
    getChineseWeek: function () {
        //获取中文的星期
        return new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[new Date().getDay()];
    },
    closeWindow: function () {
        window.opener = null;
        window.open('', '_self');
        window.close();
    },
    wcfDate2JsDate: function (wcfDate) {
        var date = new Date(parseInt(wcfDate.substring(6)));
        return date;
    },
    jsDate2WcfDate: function (jsDate) {
        return "\/Date(" + jsDate.getTime() + "+0000)\/";
    },
    objectLength: function (o) {
        var t = typeof this;
        if (t == 'string') {
            return this.length;
        } else if (t == 'object') {
            var n = 0;
            for (var i in o) {
                n++;
            }
            return n;
        }
        return false;
    },
    getStyle: function (el, attr) {
        //获取el当前的attr样式，解决ie问题
        return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el, null)[attr];
    },
    checkPasswordStrong: function (sValue) {
        //检测密码强度
        //1:弱, 2中, 3强, 4安全
        var modes = 0;
        //正则表达式验证符合要求的
        if (sValue.length < 8) return modes;
        if (/\d/.test(sValue)) modes++; //数字
        if (/[a-z]/.test(sValue)) modes++; //小写
        if (/[A-Z]/.test(sValue)) modes++; //大写
        if (/\W/.test(sValue)) modes++; //特殊字符

        //逻辑处理
        switch (modes) {
            case 1:
                return 1;
                break;
            case 2:
                return 2;
            case 3:
            case 4:
                return sValue.length < 12 ? 3 : 4
                break;
        }
    },
    getRequest: function (item) {
        //获取URI的传递参数的值
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    },
    "api": function (param) {
        var type = typeof (param.type) != "undefined" ? param.type.toLowerCase() : "post";
        Ext.Ajax.request({
            url: api + param.url,
            params: typeof (param.params) != "undefined" ? (type == "post" ? Ext.encode(param.params) : param.params) : null,
            async: typeof (param.async) != "undefined" ? param.async : true,
            headers: { 'Content-Type': 'application/json;utf-8' },
            method: type,
            timeout: 3600000, //超时时间设置，缺省30s，设置成60分钟。
            callback: function (options, success, response) {
                if (typeof (param.fn) != "undefined") {
                    var json = Ext.decode(response.responseText);
                    if (success) {
                        param.fn(json);
                    } else {
                        if (json == null) param.fn("Error:" + response.statusText);
                        else param.fn("Error:" + json.Message);
                    }
                }
            }
        });
    },
    "jqapi": function (param) {
        var type = typeof (param.type) != "undefined" ? param.type.toLowerCase() : "post";
        $.ajax({
            data: type == "get" ? param.params : JSON.stringify(param.params),
            url: api + param.url,
            type: type,
            timeout: 3600000, //超时时间设置，缺省30s，设置成60分钟。
            async: typeof (param.async) != "undefined" ? param.async : true,
            contentType: "application/json;utf-8",
            dataType: typeof (param.dataType) != "undefined" ? param.dataType : "json",
            cache: false,
            ifModified: true,
            success: function (json) {
                if (typeof (param.fn) != "undefined")
                    param.fn(json);
            }
        });
    },
    "getApiRootUrl": function () {
        return api;
    },
    "loadjs": function (scripts, callback) {
        // 动态加载js文件。
        if (typeof (scripts) != "object") var scripts = [scripts];
        var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
        var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) {  //递归
            s[i] = document.createElement("script");
            s[i].setAttribute("type", "text/javascript");
            s[i].onload = s[i].onreadystatechange = function () { //Attach handlers for all browsers
                if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                    if (i != last) recursiveLoad(i + 1); else if (typeof (callback) == "function") callback();
                }
            }
            s[i].setAttribute("src", scripts[i]);
            HEAD.appendChild(s[i]);
        };
        recursiveLoad(0);
    },
};
Array.prototype.toExtStoreData = function () {
    //将数组转换成可供ExtStore使用的数据组织格式。
    var array = [];
    for (var i = 0; i < this.length; i++)
        array.push([this[i]]);
    return array;
}
//数组扩展，指定item是否在数据组中存在
Array.prototype.contains = function (e) {
    var r = new RegExp(String.fromCharCode(2) + e + String.fromCharCode(2));
    return (r.test(String.fromCharCode(2) + this.join(String.fromCharCode(2)) + String.fromCharCode(2)));
};
//获取最大值
Array.prototype.max = function () {   //最大值
    return Math.max.apply({}, this)
}
//获取最小值
Array.prototype.min = function () {   //最小值
    return Math.min.apply({}, this)
}
//去掉重复元素(保留原有顺序)。
Array.prototype.uniq = function () {
    var ret = [];
    for (var i = 0, j = this.length; i < j; i++) {
        if (ret.indexOf(this[i]) === -1) {
            ret.push(this[i]);
        }
    }
    return ret;
}
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//字符串扩展
String.prototype.padLeft = function (length, sign) {
    var str = this;
    if (str.length >= length) return str;
    else {
        str = sign + str;
        return str.padLeft(length, sign);
    }
}
String.prototype.padRight = function (length, sign) {
    var str = this;
    if (this.length >= length) return str;
    else {
        str += sign;
        return str.padRight(length, sign);
    }
}
String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
};
String.prototype.trimLeft = function () {
    return this.replace(/^\s+/, '');
};
String.prototype.trimRight = function () {
    return this.replace(/\s+$/, '');
};
String.prototype.left = function (length) {
    return this.substr(0, length);
};
String.prototype.right = function (length) {
    return this.substr(this.length - length);
}
String.prototype.mid = function (start, len) {
    return this.substr(start, len);
}
String.prototype.contains = function (e) {
    return this.indexOf(e) >= 0;
}
//字符串验证
String.prototype.isEmail = function () {
    //是否是正确的email地址
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this);
}
String.prototype.isIncludeChinese = function () {
    //[\u4E00-\u9FA5]為漢字﹐[\uFE30-\uFFA0]為全角符號
    return /^[\x00-\xff]*$/.test(this);
}
String.prototype.isNumeric = function (flag) {
    //验证是否是数字
    if (isNaN(this)) {
        return false;
    }
    switch (flag) {
        case null:        //数字
        case "":
            return /^-?\d+$/.test(this);
        case "+":        //正数
            return /(^\+?|^\d?)\d*\.?\d+$/.test(this);
        case "-":        //负数
            return /^-\d*\.?\d+$/.test(this);
        case "i":        //整数
            return /(^-?|^\+?|\d)\d+$/.test(this);
        case "+i":        //正整数
            return /(^\d+$)|(^\+?\d+$)/.test(this);
        case "-i":        //负整数
            return /^[-]\d+$/.test(this);
        case "f":        //浮点数
            return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(this);
        case "+f":        //正浮点数
            return /(^\+?|^\d?)\d*\.\d+$/.test(this);
        case "-f":        //负浮点数
            return /^[-]\d*\.\d$/.test(this);
        default:        //缺省
            return true;
    }
}
String.prototype.Replace = function (replacement, target) {
    //将字符串的中子串replacement用target进行替换
    try {
        var text = this;
        if (text == null || text == "") return text; //如果text无内容,返回text
        if (replacement == null || replacement == "") return text; //如果replacement无内容,返回text
        if (target == null) target = ""; //如果target无内容,设置为空串
        var returnString = ""; //定义返回值变量,并初始化
        var index = text.indexOf(replacement); //定义查找replacement的索引下标,并进行第一次查找
        while (index != -1) {
            //直至未找到replacement,要么进行下面的处理
            returnString += text.substring(0, index) + target; //如果找到的replacement前有字符,累加到返回值中,并加上target
            text = text.substring(index + replacement.length); //取掉找到的replacement及前边的字符
            index = text.indexOf(replacement); //进行查询,准备下一次处理
        }
        if (text != "") returnString += text; //如果找到的最后一个replacement后有字符,累加到返回值中
        return returnString; //返回
    }
    catch (e) {
        return null;
    }
}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
String.prototype.isMobile = function () {
    return (/^(?:13\d|14\d|15\d|18\d|17\d)-?\d{5}(\d{3}|\*{3})$/.test(this.trim()));
}
//获取字符串长度（汉字算两个字符，字母数字算一个）
String.prototype.len = function () {
    var len = 0;
    var val = this;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
}
String.prototype.validateIdcard = function () {
    var errors = new Array("验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!", "身份证地区非法!");
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙 江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖 北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西 藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国 外" };
    var iSum = 0;
    //var info = "";
    var strIDno = this;
    var idCardLength = strIDno.length;
    if (!/^\d{17}(\d|x)$/i.test(strIDno) && !/^\d{15}$/i.test(strIDno))
        return errors[1]; //非法身份证号
    if (aCity[parseInt(strIDno.substr(0, 2))] == null)
        return errors[4];// 非法地区
    // 15位身份证转换为18位
    if (idCardLength == 15) {
        sBirthday = "19" + strIDno.substr(6, 2) + "-" + Number(strIDno.substr(8, 2)) + "-" + Number(strIDno.substr(10, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        var dd = d.getFullYear().toString() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        if (sBirthday != dd)
            return errors[2]; //非法生日
        strIDno = strIDno.substring(0, 6) + "19" + strIDno.substring(6, 15);
        strIDno = strIDno + GetVerifyBit(strIDno);
    }
    // 判断是否大于2078年，小于1900年
    var year = strIDno.substring(6, 10);
    if (year < 1900 || year > 2078)
        return errors[2];//非法生日
    //18位身份证处理
    //在后面的运算中x相当于数字10,所以转换成a
    strIDno = strIDno.replace(/x$/i, "a");
    sBirthday = strIDno.substr(6, 4) + "-" + Number(strIDno.substr(10, 2)) + "-" + Number(strIDno.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))
        return errors[2]; //非法生日
    // 身份证编码规范验证
    for (var i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
    if (iSum % 11 != 1)
        return errors[3];// 非法身份证号
    // 判断是否屏蔽身份证
    var words = new Array();
    words = new Array("11111119111111111", "12121219121212121");
    for (var k = 0; k < words.length; k++) {
        if (strIDno.indexOf(words[k]) != -1) {
            return errors[1];
        }
    }
    return errors[0];
}
Number.prototype.percent = function (n) {
    if ("undefined" == typeof (n) || n == null || n <= 0) n = 0;
    return (Math.round(this * Math.pow(10, n + 2)) / Math.pow(10, n)).toFixed(n) + '%';
}
String.prototype.warp = function (s, w) {
    var result = this.split(",");
    for (var i = 0; i < result.length; i++) result[i] = w + result[i] + w;
    return result.join(s);
}
Number.prototype.CNY = function (f) {
    //将数字转换成大写的金额，f为True时添加“人民币”三个字
    var numberValue = new String(Math.round(this * 100)); // 数字金额
    var chineseValue = ""; // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
    var len = numberValue.length; // numberValue 的字符串长度
    var Ch1; // 数字的汉语读法
    var Ch2; // 数字位的汉字读法
    var nZero = 0; // 用来计算连续的零值的个数
    var String3; // 指定位置的数值
    if (len > 15) {
        return "超出计算范围";
    }
    if (numberValue == 0) {
        chineseValue = "零元整";
        return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
        String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
        }
        else { // 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else {
                Ch1 = "";
                Ch2 = String2.substr(i, 1);
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
                Ch2 = String2.substr(i, 1);
            }
        }
        chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) { // 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue + "整";
    }
    return (f ? "人民币" : "") + chineseValue;
}
//检测字符串是否是json字符串
String.prototype.isJSON=function () {
    console.log(this);
    if (typeof(this) == 'string') {
        try {
            var obj=JSON.parse(this);
            if(this.indexOf('{')>-1){
                return true;
            }else{
                return false;
            }
        } catch(e){
            return false;
        }
    }
    return false;
}