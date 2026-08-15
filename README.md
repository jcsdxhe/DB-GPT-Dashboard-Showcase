# DB-GPT 数据看板公开浏览版

这是“基于 Agent 的数据看板生成与发布”项目的公开浏览版。页面采用 DB-GPT 的视觉语言，展示自然语言生成、看板编辑、筛选联动、刷新、局部失败、修订冲突、发布、只读分享和看板管理能力。

公开页面使用内置示例数据，不连接业务数据库。完整 Lab 版本中的草稿、权限、审计、发布版本、分享生命周期和定时任务均由真实后端接口提供。

## 页面

- `/`：数据看板首页与全部看板管理入口。
- `/dashboards/showcase-v2/?case=walmart`：AI 批注式可视编辑候选版（Walmart）。
- `/dashboards/showcase-v2/?case=apple`：AI 批注式可视编辑候选版（Apple）。
- `/dashboards/showcase/?case=walmart`：Walmart 门店经营看板。
- `/dashboards/showcase/?case=apple`：Apple 财务分析看板。
- `/dashboard-share/showcase/`：只读发布快照。

## 维护

首页源码保存在 `src/index.html`。执行 `node scripts/productize-showcase.mjs` 会更新根首页，并统一清理导出页面中的旧展示文案。

## 在线体验

- AI 可视编辑候选版（Walmart）：<https://jcsdxhe.github.io/DB-GPT-Dashboard-Showcase/dashboards/showcase-v2/?case=walmart>
- AI 可视编辑候选版（Apple）：<https://jcsdxhe.github.io/DB-GPT-Dashboard-Showcase/dashboards/showcase-v2/?case=apple>
- Walmart 工作台：<https://jcsdxhe.github.io/DB-GPT-Dashboard-Showcase/dashboards/showcase/?case=walmart>
- Apple 案例：<https://jcsdxhe.github.io/DB-GPT-Dashboard-Showcase/dashboards/showcase/?case=apple>

页面为纯静态站点，不要求登录、模型密钥或数据库服务器，支持现代桌面和手机浏览器。

候选版新增图形/表格元素选择、评论、变更预览与应用、12 类展示层可视化和表格三态排序。助手明确标记为浏览器本地确定性原型，不伪装成真实联网模型。

## 真实可查询的示例数据库

Walmart 案例随站点发布 `walmart_sales.db`：

- SQLite 数据库，520 行合成周销售记录；
- 时间范围为 2011-01-07 至 2012-12-28；
- 在浏览器内通过 SQLite WebAssembly 真实执行 SQL；
- 查询台仅允许 `SELECT`、`WITH` 和 `EXPLAIN QUERY PLAN SELECT`；
- 写入、多语句和数据库管理命令会被拒绝；
- 可直接下载 `.db` 文件，用 SQLite 工具自行检查。

打开 Walmart 工作台后点击顶部 **“数据源”** 即可现场查询。

## 在另一台电脑本地运行

需要安装 Git 与 Python 3。

```bash
git clone https://github.com/jcsdxhe/DB-GPT-Dashboard-Showcase.git
cd DB-GPT-Dashboard-Showcase
python start-local.py
```

然后打开终端显示的地址：

```text
http://127.0.0.1:8000/DB-GPT-Dashboard-Showcase/dashboards/showcase/?case=walmart
```

停止服务时按 `Ctrl+C`。这套启动方式不需要 `npm install`，适合在其他电脑离线运行。

## 使用边界

- 看板编辑、发布和分享状态保存在当前浏览器的 `localStorage`；点击“状态与重置 → 恢复默认状态”可清除本地修改。
- “Agent 生成”是按真实事件名称制作的确定性重播，以保证公开页面稳定；不是在公开网页中调用付费模型。
- Walmart 是可复现的合成数据，不代表真实经营结论。
- Apple 是 SEC 10-K 公开数据快照，不构成投资建议。
- 只读分享页读取发布时冻结的本地快照，不会匿名连接数据库。

## 许可与致谢

本展示站基于 DB-GPT 项目的界面和技术体系进行独立原型开发，保留上游 MIT License。图表、组件和交互用于数据分析产品能力与工程实现验证。
