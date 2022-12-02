### 运行demo

1. python版本: 3.6.10

2. 启动流程:

   ```
   cd zone-python-demo
   pip install -r requirements.txt
   python3 demo.py
   ```

3. 默认5000端口

### 接入流程

1. 获取key   请前往https://0.zone/applyParticulars?type=site 查看
2. 提交认证企业  前往https://0.zone/dataService 查看

### 接口

##### 数据接口

- Url :  /data

- Method : POST

- Request 

  |   参数名   |  类型  |                  说明                  |
  | :--------: | :----: | :------------------------------------: |
  |   title    | string |                搜索条件                |
  | title_type | string | 搜索类型(site: 信息系统  domain: 域名) |
  |  company   | string |                认证公司                |
  |    page    |  int   |                 当前页                 |
  |  pagesize  |  int   |                 页大小                 |
  |    key     | string |               0.zone key               |

- Response

  请前往 https://0.zone/applyParticulars?type=site 查看信息系统返回参数说明

  域名类型 返回参数说明

  | 参数名  |  类型  |        说明         |
  | :-----: | :----: | :-----------------: |
  |  code   |  int   | 状态码  0成功 1失败 |
  | message | string |      状态信息       |
  |  data   |  dict  |      返回数据       |

  ```
  data 数据说明
  {
          "company_logo": "https://s3.bmp.ovh/imgs/2022/03/145eab400b6fa504.png", # 公司logo
          "company_name": "北京零零信安科技有限公司", # 公司名
          "company_tags": ["北京零零信安科技有限公司"], # 公司标签
          "label": {    # domain，site类型数量
              "domain": "14",
              "site": "72"
          },
          "statement": "(company=北京零零信安科技有限公司||icp=北京零零信安科技有限公司||level=北京零零信安科技有限公司||domain=北京零零信安科技有限公司||toplv_domain=北京零零信安科技有限公司)",  # 搜索条件
          "total": "14",  # 总数
          "data_list": [
              {
                  "_id": "upgrade_00sec_comdomain_new_0",
                  "_index": "domain_new_0",
                  "_score": 13.407049,
                  "_source": {
                      "company": "北京零零信安科技有限公司",   # 所属公司
                      "domain": "00sec.com",		# 域名
                      "group": "北京零零信安科技有限公司", # 集团公司
                      "icp": "",  # icp
                      "level": "子域名", # 域名级别
                      "msg": {
                          "ip": "39.98.171.121",  # 解析ip
                          "mx_list": []
                      },
                      "timestamp": "2022-05-30T19:03:50.979764",
                      "title": "",  # 标题
                      "toplv_domain": "com",  
                      "url": "upgrade.00sec.com"
                  },
                  "_type": "_doc",
                  "type": "domain"
              },
              ...
             ]
   }
  ```

  

聚合数据接口

- Url : /aggs

- Method : POST

- Request 

  |   参数名   |  类型  |    说明    |
  | :--------: | :----: | :--------: |
  |   title    | string |  搜索条件  |
  | title_type | string |  搜索类型  |
  |  company   | string |  认证公司  |
  |    key     | string | 0.zone key |

导出接口

- Url : /export

- Method : GET  # 获取导出历史

- Request 

  | 参数名 |  类型  |    说明    |
  | :----: | :----: | :--------: |
  |  key   | string | 0.zone key |

- Response

  | 参数名  |  类型  |        说明         |
  | :-----: | :----: | :-----------------: |
  |  code   |  int   | 状态码  0成功 1失败 |
  | message | string |      状态信息       |
  |  data   |  list  |      返回数据       |

  ```
  data 数据说明
  [
          {
              "date_time": "2022-12-01T15:53:46.680150",  # 导出日期
              "down_url": "http://127.0.0.1:8001/api/plug/down/?id=54a4e546-a77d-419d-b251-4f8cd8294922&ticket=YmM2ZGVkM2MtM2YxYS00ZjUyLWFhODUtNTliYmNjYjE3NjE1",  # 下载url
              "filename": "1669881226676311.csv",  # 文件名
              "id": "54a4e546-a77d-419d-b251-4f8cd8294922", # 导出数据id
              "status": 0 # 导出状态 0成功 1导出中 2失败
          },
          ...
  ]
  ```

  



- Method : POST #导出csv文件

- Request 

  |   参数名   |  类型  |    说明    |
  | :--------: | :----: | :--------: |
  |   title    | string |  搜索条件  |
  | title_type | string |  搜索类型  |
  |  company   | string |  认证公司  |
  |    key     | string | 0.zone key |

- Response:

  | 参数名  |  类型  |        说明         |
  | :-----: | :----: | :-----------------: |
  |  code   |  int   | 状态码  0成功 1失败 |
  | message | string |      状态信息       |

  

- Method : DELETE  # 删除导出历史

- Request 

  | 参数名 |  类型  |      说明      |
  | :----: | :----: | :------------: |
  |  key   | string |   0.zone key   |
  |  ids   |  list  | 导出数据id列表 |

- Response 

  | 参数名  |  类型  |        说明         |
  | :-----: | :----: | :-----------------: |
  |  code   |  int   | 状态码  0成功 1失败 |
  | message | string |      状态信息       |

