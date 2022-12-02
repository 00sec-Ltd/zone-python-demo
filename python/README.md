### 1. 后台接入

1. 前往 https://0.zone/dataService 提交认证企业
2. 企业认证成功后，前往 https://0.zone/applyParticulars?type=site 获取 API KEY
3. 定义 api 视图

```
# 配置类
class Config:
    key = "您的 API KEY"

# 数据获取类
class Main:
    def __init__(self) -> None:
        self.base_url = "https://0.zone/"
        self.data_url = self.base_url + "api/plug/data/"  # 数据url
        self.aggs_url = self.base_url + "api/plug/aggs/"  # 聚合数据url
        self.export_url = self.base_url + "api/plug/export/" # 导出相关url

    def getData(self, data: dict, request_type: int=0) -> dict:
        if request_type:
            request_url = self.data_url
        else:
            request_url = self.aggs_url

        try:
            response = requests.post(url=request_url, json=data, timeout=10)
        except Exception as e:
            raise e
        
        return json.loads(response.text)

    def getExportData(self, data: dict, request_type: int=0):
        request_data= dict(url=self.export_url, timeout=10)
        if request_type:
            request_data.update(json=data)
        else:
            request_data.update(params=data)

        try:
            if not request_type:
                response = requests.get(**request_data)
            elif request_type == 1:
                response = requests.post(**request_data)
            else:
                response = requests.delete(**request_data)
        except Exception as e:
            raise e

        return json.loads(response.text)

'''
以下为 flask 示例
Django 或其他 web 框架略有不同
'''
import json
import requests

from flask import Flask, request, jsonify

app = Flask(__name__)

'''
定义获取数据视图，前缀与前台 base_api_path 参数保持一致
聚合与导出接口实现，请参考本文接口说明或查看示例
'''
@app.route("/data", methods=["POST"])
def data():
    # 获取数据
    data = request.json
    request_data = dict(
        title=data.get("title", ""), # 搜索条件
        title_type=data.get("title_type", ""), # 搜索类型 目前只支持site(信息系统), domain(域名)
        company=data.get("company", ""), # 认证公司
        page=data.get("page", 1), # 页数
        pagesize=data.get("pagesize", 10), # 页大小
        key=Config.key # 0.zone key
    )
    try:
        data = Main().getData(request_data, request_type=1)      
    except:
        return jsonify(dict(code=1, message="获取数据失败"))
        
	 # 返回 json 格式的数据
    return jsonify(data)

```

### 2. 接口说明

##### 2.1 数据接口

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



##### 2.2 聚合数据接口

- Url : /aggs

- Method : POST

- Request

  |   参数名   |  类型  |    说明    |
  | :--------: | :----: | :--------: |
  |   title    | string |  搜索条件  |
  | title_type | string |  搜索类型  |
  |  company   | string |  认证公司  |
  |    key     | string | 0.zone key |

##### 2.3 导出相关接口

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
  
### 3. 运行demo
 
1. 您也可运行此 demo 预览效果
2. python版本: 3.6.10
3. 启动流程:

   ```
   cd zone-python-demo
   pip install -r requirements.txt
   python3 demo.py
   ```
4. 访问 http://127.0.0.1:5000
