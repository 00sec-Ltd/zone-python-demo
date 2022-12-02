function isLeaglBrackets(string) {
  // 判断字符串内 () 是否闭合，如 (a=1&&b=2) 或 (a=1(b=2)) 为闭合, (a=1(b=2) 没闭合
  const array = [];
  for (let i = 0; i < string.length; i += 1) {
    const item = string[i];
    if (item === '(') {
      array.push('(');
    } else if (item === ')') {
      if (array.length === 0) {
        return false;
      } else {
        array.pop();
      }
    } else {
      continue;
    }
  }
  return array.length === 0;
}

function getGroups(key) {
  let tmp = '';
  const groups = [];
  // 如果外层括号内所有内层括号闭合，则去掉最外层括号, 如：(a=1&&b=1(c)) 变为a=1&&b=1(c)
  let cleanKey = key.trim();
  const firstBracket = cleanKey.indexOf('(');
  const lastBracket = cleanKey.lastIndexOf(')');

  if (
    firstBracket === 0 &&
    lastBracket === cleanKey.length - 1 &&
    isLeaglBrackets(cleanKey.slice(firstBracket + 1, lastBracket))
  ) {
    cleanKey = cleanKey.slice(firstBracket + 1, lastBracket);
  }

  // 构造分组
  for (let i = 0; i < cleanKey.length; i += 1) {
    // 括号闭合证明是合法分组
    const isGroup = isLeaglBrackets(tmp);
    const matchOp = ['&', '|'].includes(cleanKey[i]);
    // || && 两次相同
    const nextEq = cleanKey[i] === cleanKey[i + 1];

    if (tmp && matchOp && isGroup && nextEq) {
      // 分组
      groups.push(tmp[0] === '(' && tmp[tmp.length - 1] === ')' ? tmp.substring(1, tmp.length - 1) : tmp);
      // || && 操作符
      // groups.push(`${cleanKey[i]}${cleanKey[i + 1]}`)
      tmp = '';
      i += 1;
    } else {
      tmp += cleanKey[i];
    }
  }
  // 添加最后一个元素
  groups.push(tmp[0] === '(' && tmp[tmp.length - 1] === ')' ? tmp.substring(1, tmp.length - 1) : tmp);
  return groups;
}
function transformTimestamp(timestamp) {
  let a = new Date(timestamp).getTime();
  const date = new Date(a);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const dateString = Y + M + D + h + m;
  return dateString;
}

const siteList = [
  {
    name: 'URL',
    value: '_source.url',
    checked: true,
    create(value) {
      return value;
    },
  },
  {
    name: 'IP',
    value: '_source.ip',
    checked: true,
    create(value) {
      return value;
    },
  },
  {
    name: '端口',
    value: '_source.port',
    checked: true,
    create(value) {
      return value;
    },
    type: 'port',
    aggs: [],
    aggstype: 'port',
  },
  {
    name: '设备类型',
    value: '_source.extra_info',
    checked: true,
    create(value) {
      let _Html = '';
      if (value instanceof Array) {
        value.forEach((element) => {
          _Html += element.lv3 || '';
        });
      } else {
        _Html = value.lv3;
      }

      return _Html;
    },
    type: 'extra_info',
    aggs: [],
    aggstype: 'equipment_info',
  },
  {
    name: '组件',
    value: '_source.component',
    checked: true,
    create(value) {
      return value;
    },
    type: 'component',
    aggs: [],
    aggstype: 'element',
  },
  {
    name: '服务',
    value: '_source.service',
    checked: true,
    create(value) {
      return value;
    },
    type: 'service',
    aggs: [],
    aggstype: 'service',
  },
  {
    name: '操作系统',
    value: '_source.os',
    checked: true,
    create(value) {
      return value;
    },
    type: 'os',
    aggs: [],
    aggstype: 'operation',
  },
  {
    name: '运营商',
    value: '_source.operator',
    checked: true,
    create(value) {
      return value;
    },
    type: 'operator',
    aggs: [],
    aggstype: 'operator',
  },
  // {
  //   name: 'banner',
  //   value: '_source.banner',
  //   checked: true,
  // },
  {
    name: '更新时间',
    value: '_source.timestamp',
    checked: true,
    create(value) {
      return transformTimestamp(value);
    },
  },
  {
    name: '发现时间',
    value: '_source.explore_timestamp',
    checked: true,
    create(value) {
      return transformTimestamp(value);
    },
  },
  {
    name: '国家',
    value: '_source.country',
    checked: false,
    create(value) {
      return value;
    },
    type: 'country',
    aggs: [],
    aggstype: 's_country',
  },
  {
    name: '省',
    value: '_source.province',
    checked: false,
    create(value) {
      return value;
    },
    type: 'province',
    aggs: [],
    aggstype: 'province',
  },
  {
    name: '城市',
    value: '_source.city',
    checked: false,
    create(value) {
      return value;
    },
    type: 'city',
    aggs: [],
    aggstype: 's_city',
  },
  {
    name: 'ICON图标',
    value: '_source.icon_md5_base64[0].base64',
    checked: false,
    create(value) {
      return value;
    },
    type: 'icon',
    aggs: [],
    aggstype: 'icon',
  },
  {
    name: '备案',
    value: '_source.put_record',
    checked: false,
    create(value) {
      return value;
    },
    type: 'put_record',
    aggs: [],
    aggstype: 'put_record',
  },
  {
    name: '标签',
    value: '_source.tags',
    checked: false,
    create(value) {
      let _Html = '';
      value.forEach((element) => {
        _Html += element || '';
      });
      return _Html;
    },
    type: 'tags',
    aggs: [],
    aggstype: 's_tags',
  },
  {
    name: '响应状态码',
    value: '_source.status_code',
    checked: false,
    create(value) {
      return value;
    },
    type: 'status_code',
    aggs: [],
    aggstype: 's_code',
  },
  {
    name: 'title',
    value: '_source.title',
    checked: false,
    create(value) {
      return value;
    },
  },
  // {
  //   name: '组件版本',
  //   value: '_source.',
  //   checked: false,
  //   create(value) {
  //     return value;
  //   },
  // },
  // {
  //   name: 'asn码',
  //   value: '_source.',
  //   checked: false,
  // },
];
const domainList = [
  {
    name: '域名',
    value: '_source.url',
    checked: true,
    create(value) {
      return value;
    },
  },
  {
    name: '根域',
    value: '_source.domain',
    checked: true,
    create(value) {
      return value;
    },
    type: 'domain',
    aggs: [],
    aggstype: 'd_domain',
  },
  {
    name: '备案号',
    value: '_source.icp',
    checked: true,
    create(value) {
      return value;
    },
    type: 'icp',
    aggs: [],
    aggstype: 'd_icp',
  },
  {
    name: '解析IP',
    value: '_source.msg.ip',
    checked: true,
    create(value) {
      return value;
    },
  },
  {
    name: 'title',
    value: '_source.title',
    checked: true,
    create(value) {
      return value;
    },
  },
];
class Znen {
  // eslint-disable-next-line class-methods-use-this
  stringToHTML(str) {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  }

  constructor(api_pash, company, conainer) {
    this.api_pash = api_pash;
    this.company = company;
    this.conainer = conainer;
    this.title_type = 'site';
    this.configShow = true;
    this.page = 1;
    this.pagesize = 10;
    this.title = company;
    this.tags = 'site';
    this.Html = `
    <div class="zoen">
        <div class="zoen_head">
          <div class="zoen_head_content">
            <div class="head_img" id="head_img"></div>
            <div class="head_content">
              <div class="head_company" id="head_company">----</div>
              <div class="head_brief" id="head_brief">----</div>
            </div>
          </div>
          <div class="zoen_head_export">
            <div class="export">导出报告</div>
          </div>
        </div>
        <div class="zoen_tab" id="zoen_tab">
                <div class="zoen_tab_li active" value="site" id="zoen_tab_li">
                        信息系统
                        <span id="site">60</span>
                </div>
                <div class="zoen_tab_li" id="zoen_tab_li" value="domain">
                        域名
                        <span id="domain">60</span>
                </div>

        </div>
        <div class="zoen_screen">
                <div class="zoen_screen_input">
                        <input placeholder="输入关键词搜索" id="screen_input"></input>
                        <span id="screen_button">搜索</span>
                </div>
                <div class="zoen_screen_config">
                        <div class="config" id="config">
                                列表配置
                        </div>
                        <div class="tableList" id="tableList">

                        </div>
                </div>
        </div>
        <div id="tableContent">
        <div class="zoen_form">

                <table  align="center" cellspacing="0" id="table">
                        <tr id="list_table">

                        </tr>
                        <tr id="table_data">
                        </tr>
                        </table>

                      </div>

                      <div style="text-align: right;margin: 10px 20px;">
                      <div id="page" class="page_div"></div>
                        </div>
                        </div>
        </div>
        <div id="aggsinput">
        </div>
        <div class="load" id="load">
  <hr/><hr/><hr/><hr/>
</div>
      </div>
      `;
    this.tableList = siteList;
    this.plugData = [];
    this.totalData = 50;
    this.company_name = '';
    this.label = {
      domain: 0,
      site: 0,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  setListTable() {
    this.conainer.style.opacity=0.3
    $("#load").show()
    const compiled = _.template(
      '<% _.forEach(users, function(user) { %><th type="<%- user.type %>"><%- user.name %><span class="screen" id="screen" style="display:<%- user.type?"inline-block":"none" %>"></span></th><% })%>',
    );
    const compiledTable = _.template(
      '<% _.forEach(plugData, function(data) { %><tr> <% _.forEach(users, function(user) { %><td> <%- user.create(_.get(data,user.value,"")) %>   </td><% })%>  </tr><% })%>',
    );
    $('#table').html(
      compiledTable({
        users: this.tableList.filter((num) => num.checked),
        plugData: this.plugData,
      }),
    );
    $('#table').prepend(compiled({ users: this.tableList.filter((num) => num.checked) }));
    this.setAggs()
    this.conainer.style.opacity=1
    $('#load').hide();
  }

  setPaging() {
    let _this = this;
    // 分页
    $('#page').paging({
      pageNo: this.page,
      totalPage: Math.ceil(this.totalData / this.pagesize),
      totalSize: this.totalData,
      callback (num) {
        _this.page = num;
        // _this.ajaxAggs();
        _this.ajaxData();
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  setTableList() {
    const compiled = _.template(
      '<% _.forEach(users, function(user) { %><div class="checkbox" id="tableListInput"><input  type="checkbox" value="<%- user.value %>" name="<%- user.name %>" <%- user.checked?"checked":"" %>><%- user.name %></div><% })%>',
    );
    $('#tableList').html(compiled({ users: this.tableList }));
    $("#tableListInput input[type='checkbox']").on('click', (e) => {
      this.tableList = this.tableList.map((v) => {
        if (v.name === e.target.name) {
          return {
            ...v,
            checked: e.target.checked,
          };
        } else {
          return {
            ...v,
          };
        }
      });
      this.setListTable();
    });
  }

  ajaxCreate() {
    const compiledTags = _.template(
      '<% _.forEach(users, function(user) { %><span class="tags"><%- user %></span><% })%>',
    );

    $('#head_img').html(this.stringToHTML(`<img src="${this.logo}"/>`));
    $('#head_company').html(this.company_name);

    $('#head_brief').html(compiledTags({ users: this.company_tags }));
    $('#domain').html(this.label.domain);
    $('#site').html(this.label.site);
    this.setListTable();
  }

  // eslint-disable-next-line class-methods-use-this
  htmlAbnormal(value, show) {
    const compiled = _.template(
      '<div class="abnormal"><h4>查询失败</h4><h5>可能有以下原因</h5><h5>1.<%- value %></h5></div>',
    );
    const abnormal = _.template('<div class="abnormal"><h4>无法链接0.zoen数据服务器</h4></div>');
    $('#tableContent').html(show ? compiled({ value }) : abnormal());
    // console.log(compiled({ 'value': value }))
  }

  // eslint-disable-next-line class-methods-use-this
  setSuccess() {
    const abnormal = _.template(
      `<div class="zoen_form">
      <table  align="center" cellspacing="0" id="table">
              <tr id="list_table">

              </tr>
              <tr id="table_data">
                      <td align="center" valign="middle">张三张三张三张三张三张三张三张三</td>

              </tr>
              </table>

            </div>

            <div style="text-align: right;margin: 10px 20px;">
            <div id="page" class="page_div"></div>
              </div>`,
    );
    $('#tableContent').html(abnormal());
  }

  // eslint-disable-next-line class-methods-use-this
  ajaxData() {
    this.conainer.style.opacity=0.3
    $("#load").show()
    let _this = this;
    $.ajax({
      url: this.api_pash + '/data',
      type: 'POST',
      data: {
        title: this.title,
        company: this.company,
        title_type: this.title_type,
        page: this.page,
        pagesize: this.pagesize,
        // key: this.appid,
      },
      dataType: 'json',
      cache: true,
      async: true,
      success({ data, code, message }) {
        if (code === 0) {
          _this.setSuccess();
          _this.plugData = data.data_list;
          _this.totalData = parseInt(data.total, 10);
          _this.company_tags = data.company_tags;
          _this.logo = data.company_logo;
          _this.company_name = data.company_name;
          _this.label = data.label;
          _this.title = data.statement;
          $('#screen_input').val(data.statement);
          _this.ajaxCreate();
          _this.setPaging();
          _this.setTableList();
        } else {
          _this.htmlAbnormal(message, true);
        }
        _this.conainer.style.opacity=1
        $('#load').hide();
      },
      error() {
        _this.htmlAbnormal('', false);
        _this.conainer.style.opacity=1
        $('#load').hide();
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  ajaxAggs() {
    this.conainer.style.opacity=0.3
    $("#load").show()
    let _this = this;
    $.ajax({
      url: `${this.api_pash}/aggs`,
      type: 'POST',
      data: {
        title: this.title,
        company: this.company,
        title_type: this.title_type,
        page: this.page,
        pagesize: this.pagesize,
        // key: this.appid,
      },
      dataType: 'json',
      cache: true,
      async: true,
      success({ data }) {
        _this.conainer.style.opacity=1
        _this.tableList = _this.tableList.map((item) => ({
          ...item,
          aggs: _.get(data, 'aggs', {})[item.aggstype] || [],
        }));
        $('#load').hide();
      },
      error() {
        _this.conainer.style.opacity=1
        $('#load').hide();
      },
    })
  }

  create() {
    this.conainer.appendChild(this.stringToHTML(this.Html));
  }

  setAggs() {
    let _this = this;
    $('#table').on('click', 'th', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if ($(this).attr('type')) {
        const aggs = _this.tableList
          .find((item) => item.type === $(this).attr('type'))
          .aggs.map((item) => ({
            ...item,
            checked: !!getGroups(_this.title).find(
              (v) =>
                v == $(this).attr('type') + '=' + item.key ||
                v == $(this).attr('type') + '==' + item.key ||
                v == $(this).attr('type') + '=^' + item.key ||
                v == $(this).attr('type') + '=$' + item.key ||
                v == $(this).attr('type') + '=!' + item.key ||
                v == $(this).attr('type') + '=!$' + item.key ||
                v == $(this).attr('type') + '==^' + item.key ||
                v == $(this).attr('type') + '=!^' + item.key,
            ),
          }));

        const compiled = _.template(
          '<div class="aggsinput" style="left:<%- left %>px;top:<%- top %>px"><% _.forEach(users, function(user) { %><div class="list" id="aggsList"><%- user.key %><input  type="checkbox" value="<%- user.doc_count %>" name="<%- user.key %>" <%- user.checked?"checked":"" %>></div><% })%></div>',
        );
        if (aggs.length !== 0) {
          $('#aggsinput').html(compiled({ users: aggs, left: event.pageX, top: event.pageY }));
          $("#aggsList input[type='checkbox']").on('click', (e) => {
            if (e.target.checked) {
              _this.title += `&&(${$(this).attr('type')}=${e.target.name})`;
              $('#screen_input').val(_this.title);
              _this.page = 1;
              _this.ajaxAggs();
              _this.ajaxData();
            } else {
              _this.title = _this.title.replace(`&&(${$(this).attr('type')}=${e.target.name})`, '');
              $('#screen_input').val(_this.title);
              _this.page = 1;
              _this.ajaxAggs();
              _this.ajaxData();
            }
            // _this.setListTable();
          });
        }
        $('.aggsinput').hover(
          () => {
            // eslint-disable-next-line func-names
          },
          function () {
            $(this).hide();
          },
        );
      }
    });
  }

  init() {
    this.create();
    this.ajaxAggs();
    this.ajaxData();
    // 初始化数据
    let _this = this;
    $('#screen_input').val(this.title);
    $('#tableList').hide();
    // 列表配置 显示隐藏
    // eslint-disable-next-line prefer-arrow-callback
    $('#config').click(function () {
      if (_this.configShow) {
        _this.configShow = false;
        $('#tableList').show();
      } else {
        _this.configShow = true;
        $('#tableList').hide();
      }
    });
    // 切换页签
    $('#zoen_tab').on('click', 'div', function () {
      if ($(this).attr('value') === 'domain') {
        _this.tableList = domainList;
      } else {
        _this.tableList = siteList;
      }
      _this.title_type = $(this).attr('value');
      _this.page = 1;
      _this.title = _this.company;
      $(this).addClass('active').siblings().removeClass('active');
      _this.ajaxData();
      _this.ajaxAggs();
    });

    $('#screen_input').bind('input propertychange', () => {
      _this.title = $('#screen_input').val();
    });

    $('#screen_button').click(() => {
      _this.page = 1;
      _this.ajaxData();
      _this.ajaxAggs();
    });
    $('.tableList').hover(
      () => {
        // eslint-disable-next-line func-names
      },
      () => {
        _this.configShow = true;
        $('#tableList').hide();
      },
    );
  }
}
