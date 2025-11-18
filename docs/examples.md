# 使用示例

本文档提供 YHPhotos 文档站的各种使用示例和最佳实践，帮助您更好地使用和定制文档站。

## 🚀 基础使用示例

### 1. 创建简单的文档页面

创建第一个文档非常简单：

```markdown
# 我的第一篇文档

欢迎来到我的文档站！

## 基本功能

这里展示基本的 Markdown 语法：

- **粗体文本**
- *斜体文本*
- `行内代码`

## 代码示例

\`\`\`javascript
function greetUser(name) {
    return \`Hello, \${name}!\`;
}

console.log(greetUser('YHPhotos'));
\`\`\`

## 表格

| 功能 | 描述 | 状态 |
|------|------|------|
| 搜索 | 快速查找文档 | ✅ |
| 主题 | 明暗主题切换 | ✅ |
| 响应式 | 移动端适配 | ✅ |

## 引用

> 这是一个重要的提示或引用。
> 
> 您可以在引用中添加多行内容。
```

### 2. 配置基本选项

```javascript
// 初始化文档应用
const docs = new DocsApp({
    theme: 'light',           // 默认主题
    sidebarWidth: 280,        // 侧边栏宽度
    enableSearch: true,       // 启用搜索
    cacheSize: 15            // 缓存大小
});

// 加载默认文档
docs.loadDocument('welcome.md');
```

## 📚 高级文档示例

### 3. 创建 API 文档

```markdown
# API 参考文档

## 公共方法

### `setTheme(theme)`

设置应用程序的主题。

**参数:**
- `theme` (string) - 主题名称: 'light' 或 'dark'

**返回值:** Promise

**示例:**

\`\`\`javascript
await docs.setTheme('dark');
console.log('主题已设置为暗色');
\`\`\`

### `loadDocument(fileName)`

异步加载指定的文档文件。

**参数:**
- `fileName` (string) - 文档文件名

**返回值:** Promise<void>

**错误处理:**

\`\`\`javascript
try {
    await docs.loadDocument('non-existent.md');
} catch (error) {
    console.error('加载文档失败:', error.message);
}
\`\`\`

## 事件

### `docs:loaded`

当文档加载完成时触发。

**事件详情:**
\`\`\`javascript
{
    detail: {
        fileName: '文档文件名',
        title: '文档标题',
        content: '文档内容'
    }
}
\`\`\`
```

### 4. 创建教程文档

```markdown
# 入门教程

本教程将引导您完成从零开始创建文档站的全过程。

## 第一步：环境准备

确保您的系统满足以下要求：

1. **浏览器要求**
   - Chrome 60+
   - Firefox 60+
   - Safari 12+

2. **开发工具**
   - 代码编辑器（推荐 VS Code）
   - Git（可选）

## 第二步：项目初始化

\`\`\`bash
# 1. 创建项目目录
mkdir my-docs
cd my-docs

# 2. 下载或克隆项目文件
git clone https://github.com/example/yhphotos-docs.git .

# 3. 启动本地服务器
python -m http.server 8000
\`\`\`

## 第三步：添加内容

### 创建文档目录

\`\`\`bash
mkdir -p docs
\`\`\`

### 添加您的第一个文档

创建文件 `docs/hello-world.md`：

\`\`\`markdown
# Hello World

这是您的第一个文档！

## 功能展示

- ✅ Markdown 支持
- ✅ 代码高亮
- ✅ 美观界面

\`\`\`
\`\`\`javascript
console.log('Hello, YHPhotos!');
\`\`\`
\`\`\`

## 第四步：自定义样式

在 `css/style.css` 中添加自定义样式：

\`\`\`css
/* 自定义主色调 */
:root {
    --primary-color: #ff6b6b;
    --accent-color: #4ecdc4;
}

/* 自定义字体 */
body {
    font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif;
}
\`\`\`

## 第五步：测试和部署

\`\`\`bash
# 1. 本地测试
open http://localhost:8000

# 2. 构建生产版本
npm run build

# 3. 部署到服务器
# 上传 dist/ 目录到您的 Web 服务器
\`\`\`
```

## 🎨 自定义样式示例

### 5. 品牌主题定制

```css
/* 自定义品牌主题 */
:root {
    /* 主色调 - 蓝色系 */
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --primary-light: #dbeafe;
    
    /* 辅助色 */
    --accent-color: #06b6d4;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    
    /* 文本颜色 */
    --text-primary: #1f2937;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    
    /* 背景颜色 */
    --background-primary: #ffffff;
    --background-secondary: #f8fafc;
    --background-tertiary: #f1f5f9;
}

/* 暗色主题 */
[data-theme="dark"] {
    --primary-color: #3b82f6;
    --text-primary: #f1f5f9;
    --background-primary: #0f172a;
    --background-secondary: #1e293b;
    --background-tertiary: #334155;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--background-secondary);
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary-hover);
}
```

### 6. 组件样式定制

```css
/* 自定义导航项样式 */
.nav-item a {
    position: relative;
    transition: all 0.3s ease;
    border-radius: 8px;
    margin: 2px 0;
}

.nav-item a:hover {
    background: linear-gradient(135deg, var(--primary-light), transparent);
    transform: translateX(4px);
}

.nav-item.active a {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* 自定义代码块样式 */
.markdown-body pre {
    background: linear-gradient(135deg, #1e293b, #0f172a);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.markdown-body code {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary-color);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.875em;
}

/* 自定义表格样式 */
.markdown-body table {
    background: linear-gradient(135deg, var(--background-secondary), var(--background-primary));
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.markdown-body th {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    font-weight: 600;
}
```

## 🔧 功能扩展示例

### 7. 添加自定义功能

```javascript
// 创建自定义功能扩展
class DocsExtensions {
    constructor(docsApp) {
        this.docs = docsApp;
        this.init();
    }
    
    init() {
        // 添加返回顶部按钮
        this.addBackToTop();
        
        // 添加阅读进度指示器
        this.addReadingProgress();
        
        // 添加字数统计
        this.addWordCount();
        
        // 添加打印功能
        this.addPrintButton();
    }
    
    addBackToTop() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border: none;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(button);
        
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', () => {
            button.style.opacity = window.scrollY > 500 ? '1' : '0';
        });
    }
    
    addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        });
    }
    
    addWordCount() {
        const wordCount = document.createElement('div');
        wordCount.className = 'word-count';
        wordCount.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            background: var(--background-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            color: var(--text-secondary);
            box-shadow: var(--shadow-light);
        `;
        
        document.body.appendChild(wordCount);
        
        // 更新字数统计
        const updateWordCount = () => {
            const content = document.getElementById('markdownContent');
            if (content) {
                const text = content.textContent;
                const words = text.trim().split(/\s+/).length;
                wordCount.textContent = `📝 ${words} 字`;
            }
        };
        
        document.addEventListener('docs:loaded', updateWordCount);
        updateWordCount();
    }
    
    addPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '<i class="fas fa-print"></i>';
        printButton.className = 'print-button';
        printButton.style.cssText = `
            position: fixed;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            width: 3rem;
            height: 3rem;
            border: none;
            border-radius: 50%;
            background: var(--accent-color);
            color: white;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        `;
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
}

// 使用扩展
const docs = new DocsApp();
const extensions = new DocsExtensions(docs);
```

### 8. 集成第三方服务

```javascript
// 集成 Google Analytics
class GoogleAnalytics {
    constructor(trackingId) {
        this.trackingId = trackingId;
        this.init();
    }
    
    init() {
        // 添加 GA 脚本
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
        script.async = true;
        document.head.appendChild(script);
        
        // 配置 GA
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', this.trackingId);
        
        // 监听文档加载事件
        document.addEventListener('docs:loaded', (e) => {
            gtag('event', 'page_view', {
                page_title: e.detail.title,
                page_location: window.location.href
            });
        });
    }
}

// 集成搜索服务 (如 Algolia)
class AlgoliaSearch {
    constructor(appId, apiKey, indexName) {
        this.client = algoliasearch(appId, apiKey);
        this.index = this.client.initIndex(indexName);
        this.init();
    }
    
    init() {
        // 实现 Algolia 搜索逻辑
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }
    
    async performSearch(query) {
        if (query.length < 2) return;
        
        try {
            const results = await this.index.search(query);
            this.displayResults(results.hits);
        } catch (error) {
            console.error('搜索错误:', error);
        }
    }
    
    displayResults(hits) {
        // 实现搜索结果显示逻辑
        console.log('搜索结果:', hits);
    }
}
```

## 📱 移动端优化示例

### 9. 响应式设计

```css
/* 移动端优先的响应式设计 */
@media (max-width: 768px) {
    /* 移动端专用样式 */
    .sidebar {
        width: 100%;
        transform: translateX(-100%);
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    .content-header h1 {
        font-size: 1.125rem;
    }
    
    .markdown-body {
        font-size: 0.9rem;
        line-height: 1.6;
    }
    
    /* 触摸友好的按钮大小 */
    .nav-item a {
        padding: 1rem;
        font-size: 1rem;
    }
    
    .theme-toggle {
        width: 3rem;
        height: 3rem;
    }
}

@media (max-width: 480px) {
    /* 小屏幕优化 */
    .content-body {
        padding: 1rem 0.5rem;
    }
    
    .markdown-body h1 {
        font-size: 1.5rem;
    }
    
    .markdown-body h2 {
        font-size: 1.25rem;
    }
}

/* 横屏模式 */
@media (max-height: 500px) and (orientation: landscape) {
    .sidebar-header {
        padding: 0.75rem 1rem;
    }
    
    .search-box {
        padding: 0.75rem 1rem;
    }
    
    .nav-item a {
        padding: 0.5rem 0.75rem;
    }
}
```

## 🔄 最佳实践

### 10. 文档结构建议

```
docs/
├── README.md              # 项目说明
├── index.md               # 主页
├── getting-started/       # 入门指南
│   ├── installation.md
│   ├── quick-start.md
│   └── basic-usage.md
├── user-guide/           # 用户指南
│   ├── features.md
│   ├── interface.md
│   └── customization.md
├── developer/            # 开发者文档
│   ├── api-reference.md
│   ├── extending.md
│   └── contributing.md
├── examples/             # 示例代码
│   ├── basic-examples.md
│   ├── advanced-examples.md
│   └── integrations.md
├── faq.md               # 常见问题
├── changelog.md         # 更新日志
└── license.md           # 许可证
```

### 11. 性能优化建议

```javascript
// 预加载重要文档
async function preloadDocuments() {
    const importantDocs = [
        'welcome.md',
        'getting-started.md',
        'api.md'
    ];
    
    for (const doc of importantDocs) {
        try {
            await docs.loadDocument(doc);
        } catch (error) {
            console.warn(`预加载文档失败: ${doc}`, error);
        }
    }
}

// 懒加载非关键功能
function initOptionalFeatures() {
    // 只在需要时加载额外的功能
    if (window.innerWidth > 768) {
        import('./optional-features.js')
            .then(module => module.init())
            .catch(error => console.warn('可选功能加载失败:', error));
    }
}

// 缓存策略
class CacheManager {
    constructor(maxSize = 50) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
    
    get(key) {
        return this.cache.get(key);
    }
    
    clear() {
        this.cache.clear();
    }
}
```

## 🎯 部署示例

### 12. 自动化部署脚本

```bash
#!/bin/bash
# deploy.sh - 自动化部署脚本

echo "🚀 开始部署 YHPhotos 文档站..."

# 1. 清理构建目录
rm -rf dist/
mkdir -p dist/

# 2. 复制静态文件
cp -r css/ js/ docs/ index.html dist/

# 3. 压缩 CSS 和 JS
minify css/style.css > dist/css/style.min.css
minify js/app.js > js/app.min.js

# 4. 生成 sitemap
python3 generate-sitemap.py

# 5. 部署到服务器
if [ "$ENV" = "production" ]; then
    rsync -avz --delete dist/ user@server:/var/www/docs/
    echo "✅ 生产环境部署完成"
else
    rsync -avz dist/ user@staging-server:/var/www/docs-staging/
    echo "✅ 测试环境部署完成"
fi

echo "🎉 部署完成！"
```

这些示例展示了 YHPhotos 文档站的各种使用方法，从基本的文档创建到高级的功能扩展。您可以根据自己的需求选择合适的示例进行实现。

记住，YHPhotos 文档站是一个灵活的平台，您可以自由地定制和扩展它来满足您的特定需求！