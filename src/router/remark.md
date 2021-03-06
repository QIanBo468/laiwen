> 创建完页面或自定义组件后不需要手动添加路由或注册, 只需要在此页面写一下页面的备注和组件的用法即可


### 目录
```
|__index.js                   // 主路由文件,
|
|__modules                    // 逻辑文件模块
|   |__components.js          
|   |__pages.js               
|   |__tabbar.js              
|
|__remark.md                  // 页面路由备注、自定义组件用法备注、路由文件结构备注, 各种备注   
```

### 页面路由备注
```
views -> pages ->
README.md: 说明文件

login: 登录
register: 注册
forgetPwd: 忘记密码

Feedback: 问题反馈
inCome: 我的收益
notice: 公告详情
noticeList: 公告列表
FeedbackRecord: 反馈记录
CompanyProfile: 公司简介

PurchasePackage: 购买套餐
investmentRecord: 投资记录

Ethereum: 以太坊
USDT: USDT
Levincoin: 莱文币
rechargePage: 充币页面
FillMoney: 充值页面
withdraw: 提现页面
getCoin: 提币页面
getCoinList: 提币列表
myBankCard: 我的银行卡
addressBook: 地址簿
exchange: 兑换
exchangeList: 兑换记录
LevinExchange: 兑换莱文币
Transfer: 转账记录
...
```

### 底部导航路由备注
```
views -> tabbar -> 
index: 首页
assets: 资产
investment: 投资
mine: 个人中心
...
```

### 组件路由备注
```

用法:
    <translate position="top">
        <div></div> //需要添加动画的元素
    </translate>
    position可选值 :
        top:        从下方100px处透明度为0模糊向上滑动到0px透明度为1不模糊停止;
        bottom:     从上方100px处透明度为0模糊向下滑动到0px透明度为1不模糊停止;
        left:       从右方100px处透明度为0模糊向左滑动到0px透明度为1不模糊停止;
        right:      从左方100px处透明度为0模糊向右滑动到0px透明度为1不模糊停止;
        suspension: 无限上下交替, 悬浮按钮特效
    动画持续时间为0.5s;
...
```