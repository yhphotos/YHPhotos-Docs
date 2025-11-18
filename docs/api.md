# API 文档

YHPhotos 文档站提供了完整的 API 接口供开发者使用和扩展。本文档详细介绍所有可用的 API 和配置选项。

## 核心 API

### DocsApp 类

这是文档站的核心类，提供了所有主要功能。

```javascript
import DocsApp from './js/app.js';

const docs = new DocsApp(config);
```

#### 构造函数

```javascript
new DocsApp(options)
```

**参数:**
- `options` (Object, 可选): 配置选项

```javascript
const options = {
    theme: 'light',           // 默认主题: 'light' | 'dark'
    sidebarWidth: 280,        // 侧边栏宽度(像素)
    autoGenerateNav: true,    // 是否自动生成导航
    cacheSize: 10,           // 缓存大小
    enableSearch: true,       // 启用搜索功能
    enableShortcuts: true     // 启用快捷键
};

const docs = new DocsApp(options);
```

### 核心方法

#### `setTheme(theme)`

设置应用主题

```javascript
docs.setTheme('dark');  // 设置为暗色主题
docs.setTheme('light'); // 设置为亮色主题

// 切换主题
const currentTheme = docs.currentTheme;
const newTheme = currentTheme === 'light' ? 'dark' : 'light';
docs.setTheme(newTheme);
```

**参数:**
- `theme` (string): 主题名称，'light' 或 'dark'

**返回值:** 无

**事件触发:**
- 触发 `theme:changed` 事件

---

#### `loadDocument(fileName)`

加载指定的文档

```javascript
// 加载单个文档
await docs.loadDocument('getting-started.md');

// 动态加载文档
async function loadDocsSequentially() {
    const files = ['intro.md', 'guide.md', 'api.md'];
    for (const file of files) {
        await docs.loadDocument(file);
        console.log(`已加载: ${file}`);
    }
}
```

**参数:**
- `fileName` (string): 文档文件名

**返回值:** Promise (无具体返回值)

**事件触发:**
- 触发 `docs:loading` 事件（开始加载）
- 触发 `docs:loaded` 事件（加载完成）

---

#### `toggleSidebar()`

切换侧边栏显示状态

```javascript
docs.toggleSidebar(); // 切换侧边栏

// 移动端专用
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    docs.toggleSidebar();
}
```

**参数:** 无

**返回值:** 无

**事件触发:**
- 触发 `sidebar:toggled` 事件

---

#### `search(query)`

执行文档搜索

```javascript
// 搜索文档
const results = docs.search('快速开始');

// 获取搜索结果数量
const count = docs.getSearchResultsCount();

// 清除搜索
docs.clearSearch();
```

**参数:**
- `query` (string): 搜索关键词

**返回值:** Array - 匹配结果数组

---

### 事件系统

文档站支持完整的事件系统，可以通过事件监听来扩展功能。

#### 常用事件

```javascript
// 文档加载事件
document.addEventListener('docs:loading', (event) => {
    console.log('开始加载文档:', event.detail.fileName);
    showLoadingIndicator();
});

document.addEventListener('docs:loaded', (event) => {
    console.log('文档加载完成:', event.detail.fileName);
    hideLoadingIndicator();
    updateNavigation(event.detail.fileName);
});

// 主题切换事件
document.addEventListener('theme:changed', (event) => {
    console.log('主题已切换到:', event.detail.theme);
    localStorage.setItem('user-theme', event.detail.theme);
});

// 侧边栏事件
document.addEventListener('sidebar:toggled', (event) => {
    console.log('侧边栏状态:', event.detail.isOpen ? '打开' : '关闭');
    updateLayout();
});

// 搜索事件
document.addEventListener('search:started', (event) => {
    console.log('开始搜索:', event.detail.query);
    showSearchResults();
});

document.addEventListener('search:completed', (event) => {
    console.log('搜索完成，找到', event.detail.results.length, '个结果');
    renderSearchResults(event.detail.results);
});
```

#### 自定义事件

```javascript
// 触发自定义事件
const event = new CustomEvent('custom:action', {
    detail: { message: '自定义事件数据' }
});
document.dispatchEvent(event);
```

### 配置选项

#### 主题配置

```css
/* 自定义主题颜色 */
:root {
    /* 主色调 */
    --primary-color: #6366f1;
    --primary-hover: #5856eb;
    --primary-light: #a5b4fc;
    
    /* 文本颜色 */
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-muted: #9ca3af;
    
    /* 背景颜色 */
    --background-primary: #ffffff;
    --background-secondary: #f9fafb;
    --background-tertiary: #f3f4f6;
    
    /* 边框颜色 */
    --border-color: #e5e7eb;
    --border-light: #f3f4f6;
    
    /* 阴影 */
    --shadow-light: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 暗色主题 */
[data-theme="dark"] {
    --primary-color: #818cf8;
    --text-primary: #f9fafb;
    --background-primary: #111827;
}
```

#### 布局配置

```css
/* 尺寸变量 */
:root {
    --sidebar-width: 280px;
    --header-height: 60px;
    --content-max-width: 800px;
    --border-radius: 8px;
    --border-radius-lg: 12px;
    
    /* 动画 */
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.15s ease;
}

/* 响应式断点 */
@media (max-width: 768px) {
    :root {
        --sidebar-width: 100%;
        --header-height: 56px;
    }
}
```

### 扩展开发

#### 创建自定义插件

```javascript
class CustomPlugin {
    constructor(docsApp) {
        this.docs = docsApp;
        this.init();
    }
    
    init() {
        // 监听文档加载事件
        document.addEventListener('docs:loaded', this.onDocsLoaded.bind(this));
        
        // 添加自定义功能
        this.addCustomFeatures();
    }
    
    onDocsLoaded(event) {
        const fileName = event.detail.fileName;
        console.log('插件检测到文档加载:', fileName);
        
        // 在这里添加插件逻辑
        this.processContent(fileName);
    }
    
    addCustomFeatures() {
        // 添加自定义UI组件
        this.createCustomButton();
    }
    
    processContent(fileName) {
        // 处理文档内容
        const content = this.docs.getCurrentContent();
        // ... 自定义处理逻辑
    }
    
    createCustomButton() {
        const button = document.createElement('button');
        button.textContent = '自定义功能';
        button.addEventListener('click', this.onCustomButtonClick.bind(this));
        
        // 添加到界面
        const headerActions = document.querySelector('.header-actions');
        headerActions.appendChild(button);
    }
    
    onCustomButtonClick() {
        // 处理按钮点击事件
        console.log('自定义按钮被点击');
    }
}

// 使用插件
const docs = new DocsApp();
const customPlugin = new CustomPlugin(docs);
```

#### 钩子系统

```javascript
// 注册钩子
DocsApp.registerHook('beforeRender', (content, fileName) => {
    // 在渲染前处理内容
    return content.replace(/\$(.*?)\$/g, '<span class="highlight">$1</span>');
});

DocsApp.registerHook('afterRender', (html, fileName) => {
    // 在渲染后处理HTML
    console.log(`文档 ${fileName} 已渲染`);
    return html;
});

DocsApp.registerHook('onError', (error, fileName) => {
    // 错误处理钩子
    console.error(`文档 ${fileName} 加载失败:`, error);
    // 可以在这里添加错误报告逻辑
});
```

### 实用工具

#### 内容处理工具

```javascript
// 提取文档标题
function extractTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : '';
}

// 生成目录
function generateTOC(content) {
    const headings = content.match(/^#{1,6}\s+(.+)$/gm, []);
    return headings.map(heading => {
        const level = heading.match(/^#+/)[0].length;
        const text = heading.replace(/^#+\s+/, '');
        return { level, text, id: text.toLowerCase().replace(/\s+/g, '-') };
    });
}

// 搜索文本内容
function searchInContent(content, query) {
    const regex = new RegExp(query, 'gi');
    const matches = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        matches.push({
            index: match.index,
            length: match[0].length,
            context: content.substring(
                Math.max(0, match.index - 50),
                Math.min(content.length, match.index + match[0].length + 50)
            )
        });
    }
    
    return matches;
}
```

### 错误处理

```javascript
// 全局错误处理
document.addEventListener('error', (event) => {
    const { message, filename, lineno, colno, error } = event.detail;
    
    console.error('文档站错误:', {
        message,
        file: filename,
        line: lineno,
        column: colno,
        error: error?.stack
    });
    
    // 显示用户友好的错误信息
    showErrorMessage('加载文档时出现错误，请稍后重试。');
});

// 自定义错误处理
class DocsError extends Error {
    constructor(message, code, fileName) {
        super(message);
        this.name = 'DocsError';
        this.code = code;
        this.fileName = fileName;
    }
}

// 抛出自定义错误
function handleFileLoad(fileName) {
    if (!fileName) {
        throw new DocsError('文件名不能为空', 'INVALID_FILENAME', fileName);
    }
    
    // ... 文件处理逻辑
}
```

---

## 使用示例

```javascript
// 完整的示例配置
const docsConfig = {
    theme: 'light',
    sidebarWidth: 280,
    enableSearch: true,
    enableShortcuts: true,
    cacheSize: 20
};

const docs = new DocsApp(docsConfig);

// 监听所有相关事件
document.addEventListener('docs:loaded', (e) => {
    console.log(`文档 ${e.detail.fileName} 加载完成`);
});

document.addEventListener('theme:changed', (e) => {
    console.log(`主题切换到: ${e.detail.theme}`);
});

// 加载文档
await docs.loadDocument('welcome.md');
await docs.loadDocument('getting-started.md');

// 切换主题
docs.setTheme('dark');

// 切换侧边栏
docs.toggleSidebar();

// 搜索功能
const results = docs.search('API');
console.log(`找到 ${results.length} 个相关结果`);
```

更多示例和使用方法，请参考 [使用示例](./examples) 页面。