# 操作日志

---

## 2026-07-17

### 本轮工作背景
- git revert 已执行，回退到 `bba3f15`（服务器备份干净版本）
- 服务器部署已完成，域名可正常访问
- 三个bug都重新回来，需要逐一修复

### 操作记录

**1. 修复光标跳末尾 bug**
- 改了：`chat-frontend.html`
- 做了什么：加 `compositionstart/compositionend` 监听，输入法组合期间跳过高度重算，Enter键也加 `!composing` 保护
- 状态：✅ 完成

**2. 修复 API 保存 bug（刷新丢失）**
- 改了：`Kel-Home-main/index.html`
- 根本原因：`persist()` 函数里 `data` 对象缺少 `apiPresets` 字段，每次刷新都回退到默认值
- 修法：在 persist() 的 data 对象里加 `apiPresets: s.apiPresets`
- 顺带修了 saveApiDraft 里 url 字段用 `||` 导致无法清空的问题（改为 `!== undefined` 判断）
- 状态：✅ 完成

**3. 语音输入 bug → 整体重写输入框**
- 改了：`chat-frontend.html`（完全重写输入区域）
- 做了什么：删掉旧输入框所有代码，重新写干净版本
  - 多行 textarea，自动扩展高度，max-height 50vh
  - 底部工具栏：左模型选择 / 中上传按钮 / 右发送按钮
  - 只绑 input 事件做高度自适应，不绑 compositionstart/end，不拦截任何输入法事件
  - 回车 = 换行，只有点发送按钮才发送
  - 发送后清空、恢复高度、自动聚焦
- 已部署到服务器 /var/www/html/chat-frontend.html
- 状态：✅ 完成，等测试语音输入

---

### 输入框全部重做（主站）
- 改了：`Kel-Home-main/index.html`
- 做了什么：删掉受控 textarea + input/composition/高度 JS，重写 Claude App 风格 composer
  - 不受控 textarea（id=kel-composer-input），无 value/onInput/onKeyDown
  - CSS field-sizing:content + min-height + max-height:50vh
  - 底部栏：模型下拉占位 / 上传按钮 / 发送按钮（有内容才可点）
  - 只点发送才发消息，回车换行；发送后清空并聚焦
- 已部署：scp → 47.98.165.126:/var/www/html/index.html
- 状态：✅ 部署完成，等测试语音输入与发送

### 发送机制改回多条入队
- 改了：`Kel-Home-main/index.html`
- 回车=立刻变成用户气泡（可连发多条），发送键=一起调 API
- 输入法确认键用 isComposing 过滤，不绑 composition 事件
- 已部署服务器；GitHub push 暂时网络失败，本地已 commit f18ff0e
- PhotoStack：已接入多图展示，但不是一比一（见回复说明）

### 修复 JavaScript 语法错误
- 改了：`Kel-Home-main/index.html`
- 问题：`_mcpStartPolling()` 方法末尾多了个逗号 `},` → 应该是 `}`
- 原因：上次修复残留问题，class 方法之间不需要逗号分隔
- 定位方法：用 `node --check` 验证提取的 script 块，找到第 6412 行
- 修复后：语法检查通过，已部署到服务器
- 状态：✅ 完成，commit 77a6453（GitHub push 因网络失败暂未推送）

### 首页/音乐/聊天页重构（第一批可测）
- 改了：`Kel-Home-main/index.html`
- 首页：删聊天/纪念日/设置卡片；保留日历/日记；加正则/音乐；间距 gap 12px；计时器下加音乐迷你卡
- 音乐：新增全屏音乐页 `tab: music`，底栏改为主页/记忆库/聊天/音乐/设置
- 聊天列表：胶囊 Tab 改为 Chats / Soul / 设置；Soul 为折叠 Persona 编辑
- 聊天详情：头部胶囊 Tab Chat / Soul / 设置；设置页空白占位
- 已部署：`scp` → `/var/www/html/index.html`
- 本地备份 commit：`0c67d50`
- 状态：✅ 先上传供浏览器验证

### UI 细化：仅图标 + 主题间距
- 首页卡片 / 底栏：去掉中文标签，只留线性图标
- 底栏音乐位改回 MCP；音乐入口只保留首页卡片 + 迷你卡
- Settings 新增「主题」卡片：可调首页卡片间距
- Soul 折叠栏去掉 emoji
- 音乐页返回改为点英文 `Music`
- commit：`e2cd4f7`，已部署
- 状态：✅ 完成

### 主题尺寸滑块 + 聊天列表去标签 + 正则页收尾（2026-07-18）
- 改了：`Kel-Home-main/index.html`
- 主题页：补全 `homeCardSizeChange` / `homeCardSizeLabel` 绑定，卡片尺寸滑块真正可调并持久化
- 聊天列表：去掉顶部 Chats/Soul/设置 胶囊标签，只保留对话列表（更不挤）
- 聊天详情：保留 Soul / 设置入口（原样）
- 正则：首页卡片进完整 Regex 页，编辑仍在正则内容里，空状态已补
- 语法：`node --check` 通过
- 状态：已部署服务器 + force-with-lease 推到 GitHub master (46d2d91)

### 待办全清 + Style 并入 Soul（2026-07-18）
- 改了：Kel-Home-main/index.html
- 纪念日/约定入口移除提示；独立 Persona 页禁用；新 Soul 页保留
- Style 并入 Soul 折叠栏；音乐设置+网易云API+进度条实时刷新
- 已 scp 部署 kel-home.xyz；GitHub 不急

### 记忆库无损迁移（2026-07-18）
- 改了：Kel-Home-main/index.html
- 新建 IndexedDB 库 KelMemories：stores memories + settings
- 启动检测 settings.migrated；未迁移则把旧 state/KelHomeData 记忆转新格式
- 新字段：id/type/content/mood/intensity/weight/is_pinned/timestamp/session_id/is_archived/source_quote/related_date（并保留旧 UI 兼容字段）
- 失败不删旧数据；Settings 显示状态+重试；成功一次性 toast
- 语法通过；已 scp 部署 kel-home.xyz；GitHub 不急

### 记忆系统 Phase B（2026-07-18）
- 改了：Kel-Home-main/index.html
- 关闭 demo 自动灌库；空迁移/空双写不再 clear 真数据
- KelMemories 升 v2：memories + settings + recycle_bin
- 正式 CRUD：save/load/update/delete + 回收站还原/永久删除/容量清理
- 设置：分类名/情绪色/提示词/回收站容量可保存
- 详情编辑 sheet 已接真保存
- 语法通过；准备 scp 部署

### 导航重构：去掉底栏（2026-07-18）
- Home 增加 Chats / Memory / MCP / Settings 卡片，样式与其他 App 卡一致
- 删除整条底部导航栏
- Memory 左上角英文 Memory 点击回 Home
- Library 英文标题点击回记忆第一层 Hub
- 分类/详情/回收站：英文标题作返回，无单独返回箭头按钮

### Home 对齐 + MCP 返回 + Phase C（2026-07-18）
- Home 卡片左对齐换行，不再居中对称第二排
- MCP 左上角英文标题点击回 Home
- Phase C：loadMemoriesForContext 替换旧衰减注入
- 双协议 tools（OpenAI tool_calls / Anthropic tool_use）
- save/update/delete_memory 执行后聊天插入记忆时间戳提示

### 修复 MCP 空白（2026-07-18）
- 根因：MCP 页面被错误嵌套在 Calendar(isPeriodPage) 内部，只有日历页时才渲染
- 修复：关闭 period 页 sc-if 后再渲染独立 MCP 页
- sc-if 开闭平衡 131/131

### 记忆 Phase D 打磨（2026-07-18）
- 列表：页面滚动触底自动加载更多 + 按钮兜底
- 回收站：0.6s rotateY 翻页动效
- estimateTokens 细化
- 导出/导入含 memRecycle + memSettings，版本 5.0-soul-mem
- 导入后同步回收站/设置到 KelMemories
- 子页底部 padding 从 100 收到 40（适配无底栏）

## 2026-07-18 ~ 07-19 深夜工作

### 记忆系统完全重写（灵魂记忆库）
- Phase A：删旧记忆 UI，新建纯白三层壳（Hub/Library/Detail/Recycle/Settings）
- Phase B：真 CRUD + 回收站 + 设置持久化 + 防 demo 写穿
- Phase C：loadMemoriesForContext 替代旧 decay 注入；OpenAI+Anthropic 双协议 tools（save/update/delete_memory）；聊天记忆时间戳提示
- Phase D：列表无限滚动、回收站便签本翻页+音效、token 估算细化、导出/导入对齐 v5.0

### 回收站便签本重做
- 改为整页便签本（一页 3~4 条按字数）
- 书本翻页动画 + Web Audio 翻页音效
- 便签纸线条 / 装订线 / 纸张阴影

### 云备份到服务器
- Settings：云备份上传 / 云备份列表恢复删除
- 后端 /api/backup GET POST GET:id DELETE
- 服务器 /home/app-data/backups，最多保留 20 份
- 已测通（手机有一份真实备份）

### 导航重构
- 删除整条底部导航栏
- Home 加 Chats/Memory/MCP/Settings 卡片（左对齐换行）
- 所有子页左上角英文标题即返回；Memory Library 回 Hub
- MCP 从 Calendar 嵌套中拆出（修复空白）

### 聊天区域优化
- 右上角更多弹层 → 聊天设置（独立页，线性返回）
- 聊天设置可调：气泡间距/字体/内边距/最大宽度/字间距/边框间距/头像
- 用户消息发给 AI 自带时间戳（tWithTs），去掉旧重复时间线
- 设置里的字体/头像大小移入聊天设置

### 其他
- 纪念日/约定 UI 入口已移除；独立 Persona 页禁用
- Style 并入 Soul 折叠栏
- 音乐设置：音量 + 网易云 API/搜索/歌曲 ID；进度条实时刷新+seek
- 主题卡片尺寸滑块、正则完整页
- 轻清理：底栏颜色绑定、空 demo seed

### 数据事故
- 部署新记忆 UI 时手机端数据丢失（浏览器 persist 空状态覆盖）
- 7/17 git 备份可恢复但用户拒绝（过时）
- 已加防护：空迁移/空双写不再 clear；部署前备份提醒写入 memory

### 状态
- 本地最新 commit：a69a612
- GitHub 比 origin 超前约 9 个 commit（用户手动上传）
- 线上 kel-home.xyz 已部署最新
- 下一步：Termux MCP 对接（用户自己搞）/ 更深残留清理

---

## 2026-07-19 记账 Finance Phase 1

### 背景
- 首页新增独立 App：Finance（记账），蓝图全量延后
- 本轮范围：入口卡 + 仪表盘 + 录入编辑删除 + KelFinance IndexedDB
- 不做：历史/钱包/底栏三 Tab/自定义分类/AI 发消息附加

### 改了
- `Kel-Home-main/index.html`
  - 首页卡片：Diary 后插入 Finance（钱包线性图标）
  - 全屏页 `tab: finance`，英文 Finance 点回 Home
  - 仪表盘：本月 SVG 圆盘 + 收入/支出/AI 支出 + 今日流水
  - 底部 sheet 记一笔/编辑/删除
  - 新库 `KelFinance` v1：transactions / categories / settings；8 个固定分类 seed
  - 分类图标用 React.createElement（dc-runtime 可渲染 isValidElement）
  - `node --check` 通过；sc-if 138/138

### 部署
- 本地已实现；**scp 待你明确授权后再部署**到 kel-home.xyz
- 部署前建议先导出/云备份（避免空状态覆盖）

### 下一步 Phase 2
- 历史月视图、钱包封面、底栏三 Tab、自定义分类、发消息附加未同步流水

---

## 2026-07-19 记账 Finance Phase 2

### 改了
- `Kel-Home-main/index.html`
  - 悬浮底栏三 Tab：仪表盘 / 历史 / 钱包（`finView`）
  - 历史：月份左右切换、三列汇总、按天分组列表
  - 钱包：总资产卡片 + 点按换封面（`settings.wallet_cover`）+ 分类列表/自定义增删
  - 自定义分类 sheet（选图标 + 名称）；固定分类不可删
  - AI 联动：`addUserMessage` 拼接未同步流水 → `markTransactionsSynced`
  - `node --check` 通过；sc-if 144/144
  - commit：本轮本地提交

### 部署
- 本地已完成；**待明确「部署到 kel-home.xyz」后再 scp**

---

## 2026-07-19 收藏 / 聊天 Tab / 用户页 / 记忆库入口

### 改了
- `Kel-Home-main/index.html`
  - 长按菜单：去掉贴表情栏，新增「收藏」
  - `KelFavorites` IndexedDB：save/load/delete；用户与 AI 分列
  - 记忆库 Hub：记忆库（通栏）+ 收藏夹 + 信箱（预留）+ 回收站（通栏）
  - Favorites 列表/详情；用户入口用聊天配色，记忆库入口用记忆库配色
  - 聊天详情：去掉顶栏 Soul 按钮；底栏三 Tab 仅图标（聊天/Soul/用户）
  - 用户 Tab：封面/头像/昵称/签名/性别/生日/我的收藏
  - 旧头像弹窗仍保留在侧栏入口，未删逻辑
  - `node --check` 通过；sc-if 155/155
  - **未部署**（用户要求本地先看，一次做完再上传）

### 说明
- 聊天设置仍从右上角更多菜单进入（不在底栏）
- 信箱仅占位文案

