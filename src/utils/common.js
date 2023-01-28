/**
 * 通用js方法封装处理
 * Copyright (c) 2019 cxstar
 */

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time
        .replace(new RegExp(/-/gm), "/")
        .replace("T", " ")
        .replace(new RegExp(/\.[\d]{3}/gm), "");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  search.params =
    typeof search.params === "object" &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === "undefined") {
    search.params["beginTime"] = dateRange[0];
    search.params["endTime"] = dateRange[1];
  } else {
    search.params["begin" + propName] = dateRange[0];
    search.params["end" + propName] = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == "" + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  return actions.join("");
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].value == "" + temp[val]) {
        actions.push(datas[key].label + currentSeparator);
      }
    });
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p]);
      } else {
        source[p] = target[p];
      }
    } catch (e) {
      source[p] = target[p];
    }
  }
  return source;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];
  // 遍历data列表数据
  for (let d of data) {
    // 获取每条数据的父节点id
    let parentId = d[config.parentId];
    // 如果childrenListMap下没有该父节点，则新建一个该父节点对应的数组
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    // 节点id的数据对应这个数据
    nodeIds[d[config.id]] = d;
    // 将该数据放入childrenListMap下对应的父节点下
    childrenListMap[parentId].push(d);
  }
  // 遍历data列表数据,寻找根节点
  for (let d of data) {
    // 获取每条数据的父节点id
    let parentId = d[config.parentId];
    // 如果该节点的父节点在nodes中为null，则为根节点，放入树中
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  // 排序
  var compare = function (obj1, obj2) {
    var val1 = obj1.order;
    var val2 = obj2.order;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  };
  Object.keys(childrenListMap).forEach((key) => {
    let arr = childrenListMap[key];
    if (arr != null && arr.length > 0) {
      childrenListMap[key] = arr.sort(compare);
    }
  });

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    // childrenListMap.id下有数据
    if (childrenListMap[o[config.id]] !== null) {
      // o.children = childrenListMap.id下的数据
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== "undefined") {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();

    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}
// 千分位格式化
export function toThousands(num) {
  if (num != undefined) {
    let str = num.toString();
    return str.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  } else {
    return 0;
  }
}
// 格式化带两位小数的数字
export function keepTwoDecimalFull(val) {
  // 转换为float
  let num = parseFloat(val);
  if (isNaN(num)) {
    // 不是数值型数据，返回0
    // console.log('ERROR:cxstar.js=>function keepTwoDecimalFull=>val is not number::', val)
    return "0.00";
  } else {
    //  转换为string进行操作
    num = num.toString();
    let index = num.indexOf(".");
    if (index == -1) {
      return num + ".00";
    } else {
      return parseFloat(num).toFixed(2);
    }
  }
}
// 处理safari浏览器无法在回调函数里调用window.open的问题
export function replaceOpen(url) {
  let dom = document.createElement("a");
  dom.setAttribute("href", url);
  document.body.appendChild(dom);
  dom.click();
}
