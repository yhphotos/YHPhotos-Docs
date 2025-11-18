# 快速开始

本指南将帮助您快速开始使用 YHPhotos 文档站。让我们一步步设置和使用这个强大的文档平台。

## 📋 前置要求

在开始之前，请确保您的系统满足以下要求：

### 系统要求
- **操作系统**: Windows, macOS, 或 Linux
- **浏览器**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **网络**: 需要互联网连接（用于加载 CDN 资源）

### 可选工具
- **代码编辑器**: VS Code, Sublime Text 等
- **Git**: 用于版本控制
- **Web 服务器**: Python, Node.js, 或 PHP

## 🚀 安装步骤

### 步骤 1: 下载项目

```bash
# 如果使用 Git
git clone https://github.com/your-username/yhphotos-docs.git
cd yhphotos-docs

# 或直接下载 ZIP 文件并解压
```

### 步骤 2: 启动本地服务器

选择以下方式之一启动 Web 服务器：

#### 使用 Python（推荐）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -M SimpleHTTPServer 8000
```

#### 使用 Node.js
```bash
# 全局安装 serve
npm install -g serve

# 启动服务器
serve . -p 8000

# 或使用 npx
npx serve . -p 8000
```

#### 使用 PHP
```bash
php -S localhost:8000
```

#### 使用 Live Server（VS Code 扩展）
1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

### 步骤 3: 访问文档站

打开浏览器并访问：
```
http://localhost:8000
```

您应该能看到 YHPhotos 文档站的欢迎页面！

## 📚 添加您的文档

### 创建第一个文档

1. 在 `docs/` 目录下创建新的 Markdown 文件：
   ```bash
   touch docs/my-first-doc.md
   ```

2. 编辑文件内容：
   ```markdown
   # 我的第一个文档
   
   这是我的文档内容！
   
   ## 功能特性
   - 功能 1
   - 功能 2
   
   ```代码示例
   console.log('Hello World!');
   ```
   ```

3. 更新导航菜单：
   打开 `index.html`，在 `<ul class="nav-list">` 中添加：
   ```html
   <li class="nav-item">
       <a href="#my-first-doc" data-file="my-first-doc.md">
           <i class="fas fa-star"></i>
           <span>我的第一个文档</span>
       </a>
   </li>
   ```

4. 刷新浏览器页面

### 文档结构建议

建议您按以下结构组织文档：

```
docs/
├── welcome.md          # 欢迎页面
├── getting-started.md  # 快速开始
├── guide/              # 指南文档
│   ├── basic.md
│   ├── advanced.md
│   └── troubleshooting.md
├── api/                # API 文档
│   ├── reference.md
│   └── examples.md
└── faq.md             # 常见问题
```

## ⚙️ 基本配置

### 自定义主题颜色

编辑 `css/style.css` 文件，修改 CSS 变量：

```css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --accent-color: #3b82f6;       /* 强调色 */
    --background-primary: #ffffff; /* 主背景 */
}
```

### 修改站点标题

编辑 `index.html` 文件：

```html
<title>您的文档站标题</title>
```

和

```html
<div class="sidebar-header">
    <h2><i class="fas fa-photo-video"></i> 您的品牌名称</h2>
</div>
```

### 自定义导航图标

在 `index.html` 中修改 Font Awesome 图标：

```html
<i class="fas fa-your-icon"></i>
```

可用图标请参考 [Font Awesome 图标库](https://fontawesome.com/icons)。

## 🔍 功能测试

安装完成后，请测试以下功能：

### ✅ 基础功能
- [ ] 页面正常加载
- [ ] 侧边栏导航工作正常
- [ ] 主题切换功能
- [ ] 搜索功能
- [ ] 响应式布局

### ✅ 文档功能
- [ ] Markdown 内容正确渲染
- [ ] 代码块语法高亮
- [ ] 表格正确显示
- [ ] 内部链接工作正常

### ✅ 交互功能
- [ ] 快捷键正常工作
- [ ] 移动端菜单功能
- [ ] 平滑滚动效果
- [ ] 加载动画

## 🎯 下一步

完成安装后，您可以：

1. **创建更多文档** - 添加您的实际文档内容
2. **自定义样式** - 调整颜色、字体、布局等
3. **扩展功能** - 根据需要添加新功能
4. **部署上线** - 将文档站部署到 Web 服务器

## ❓ 遇到问题？

如果遇到问题，请检查：

1. **浏览器控制台** - 查看是否有 JavaScript 错误
2. **网络连接** - 确保 CDN 资源可以正常加载
3. **文件路径** - 确保 Markdown 文件路径正确
4. **服务器状态** - 确认本地服务器正常运行

## 📖 更多资源

- [功能特性详解](./features)
- [API 文档](./api)
- [使用示例](./examples)
- [GitHub 仓库](https://github.com/your-username/yhphotos-docs)

---

**恭喜！** 您已经成功设置并运行了 YHPhotos 文档站。享受您的文档之旅！ 🎉