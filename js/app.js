// YHPhotos 文档站应用
class DocsApp {
    constructor() {
        this.currentTheme = localStorage.getItem('docs-theme') || 'light';
        this.autoThemeEnabled = localStorage.getItem('auto-theme-enabled') === 'true';
        this.sidebarCollapsed = false;
        this.documents = new Map();
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.setupEventListeners();
        this.setupMarkdownParser();
        this.loadDocument('welcome.md');
        this.generateNavigation();
        
        // 初始化自动主题切换
        this.initAutoThemeToggle();
        
        // 检查当前时间是否需要切换主题
        this.checkAndApplyTimeBasedTheme();
        
        // 初始化按钮状态
        this.updateAutoThemeButton();
    }

    // 设置主题
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('docs-theme', theme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 主题切换
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }

        // 自动主题切换
        const autoThemeToggle = document.getElementById('autoThemeToggle');
        if (autoThemeToggle) {
            autoThemeToggle.addEventListener('click', () => {
                this.toggleAutoTheme();
            });
        }

        // 移动端菜单切换
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // 桌面端侧边栏切换
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // 导航链接点击
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-file]') || e.target.closest('[data-file]')) {
                e.preventDefault();
                const link = e.target.matches('[data-file]') ? e.target : e.target.closest('[data-file]');
                const file = link.getAttribute('data-file');
                if (file) {
                    this.loadDocument(file);
                    this.setActiveNav(link.closest('.nav-item'));
                    
                    // 在移动端关闭侧边栏
                    if (window.innerWidth <= 768) {
                        this.closeSidebar();
                    }
                }
            }
        });

        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // 响应式处理
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        const searchInput = document.getElementById('searchInput');
                        if (searchInput) {
                            searchInput.focus();
                        }
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleTheme();
                        break;
                }
            }
            
            // ESC 键关闭侧边栏（移动端）
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });
    }

    // 设置 Markdown 解析器
    setupMarkdownParser() {
        if (typeof marked !== 'undefined') {
            // 配置 marked 选项
            marked.setOptions({
                highlight: function(code, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(code, { language: lang }).value;
                        } catch (err) {
                            console.warn('Highlighting failed:', err);
                        }
                    }
                    return code;
                },
                langPrefix: 'hljs language-',
                breaks: true,
                gfm: true
            });
        }
    }

    // 加载文档
    async loadDocument(fileName) {
        const loading = document.getElementById('loading');
        const contentDiv = document.getElementById('markdownContent');
        const pageTitle = document.getElementById('pageTitle');

        try {
            // 显示加载动画
            if (loading) loading.classList.remove('hidden');
            if (contentDiv) contentDiv.style.opacity = '0.5';

            let content;
            if (this.documents.has(fileName)) {
                content = this.documents.get(fileName);
            } else {
                // 尝试加载文件
                try {
                    const response = await fetch(`docs/${fileName}`);
                    if (response.ok) {
                        content = await response.text();
                        this.documents.set(fileName, content);
                    } else {
                        content = this.getDefaultContent(fileName);
                    }
                } catch (error) {
                    console.log(`无法加载文件 ${fileName}，使用默认内容`);
                    content = this.getDefaultContent(fileName);
                }
            }

            // 解析 Markdown
            const htmlContent = marked.parse ? marked.parse(content) : 
                               (typeof marked !== 'undefined' ? marked(content) : content);

            // 更新页面内容
            if (contentDiv) {
                contentDiv.innerHTML = htmlContent;
                contentDiv.classList.add('fade-in');
                
                // 更新页面标题
                const titleMatch = content.match(/^#\s+(.+)$/m);
                if (titleMatch && pageTitle) {
                    pageTitle.textContent = titleMatch[1];
                } else if (pageTitle) {
                    pageTitle.textContent = this.getFileTitle(fileName);
                }

                // 处理内部链接
                this.processInternalLinks(contentDiv);
                
                // 添加代码高亮
                this.highlightCode(contentDiv);
            }

        } catch (error) {
            console.error('加载文档时出错:', error);
            this.showError('加载文档时出错，请稍后重试。');
        } finally {
            // 隐藏加载动画
            if (loading) loading.classList.add('hidden');
            if (contentDiv) contentDiv.style.opacity = '1';
        }
    }

    // 获取默认内容
    getDefaultContent(fileName) {
        const defaultContents = {
            'welcome.md': `# 欢迎使用 YHPhotos 文档站

欢迎来到 YHPhotos 文档站！这里是一个现代化的文档展示平台。

## 功能特性

- 📚 丰富的 Markdown 支持
- 🎨 美观的现代化界面
- 🌙 支持明暗主题切换
- 📱 完全响应式设计
- 🔍 快速搜索功能
- ⌨️ 快捷键支持

## 快速开始

点击左侧导航栏中的任意文档链接来开始浏览。您也可以使用搜索功能快速找到所需内容。

## 快捷键

- \`Ctrl/Cmd + K\`: 聚焦搜索框
- \`Ctrl/Cmd + D\`: 切换主题
- \`ESC\`: 关闭侧边栏（移动端）

享受您的文档阅读体验！`,

            'getting-started.md': `# 快速开始

本指南将帮助您快速上手使用 YHPhotos 文档站。

## 系统要求

- 现代浏览器（Chrome 60+, Firefox 60+, Safari 12+）
- 本地 Web 服务器（推荐）

## 安装步骤

### 1. 下载项目

\`\`\`bash
git clone https://github.com/yhphotos/YHPhotos-Docs.git
cd yhphotos-docs
\`\`\`

### 2. 启动服务器

\`\`\`bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 或使用 PHP
php -S localhost:8000
\`\`\`

### 3. 访问文档站

打开浏览器访问 \`http://localhost:8000\`

## 添加文档

1. 在 \`docs/\` 目录下创建您的 Markdown 文件
2. 更新 \`index.html\` 中的导航链接
3. 刷新页面查看效果

## 自定义配置

您可以通过修改以下文件来定制站点：

- \`css/style.css\` - 样式配置
- \`js/app.js\` - 功能配置
- \`index.html\` - 页面结构

## 下一步

查看 [功能特性](/features) 了解更多功能。`,

            'features.md': `# 功能特性

YHPhotos 文档站提供了丰富的功能，让您轻松创建和管理文档。

## 🎨 界面设计

- **现代化设计**: 采用 Material Design 风格
- **响应式布局**: 完美适配桌面端和移动端
- **流畅动画**: 优雅的过渡效果和交互动画
- **可访问性**: 支持键盘导航和屏幕阅读器

## 🌙 主题系统

- **明暗双主题**: 支持亮色和暗色两种主题
- **自动保存**: 主题选择会自动保存到本地存储
- **快捷键切换**: 使用 \`Ctrl/Cmd + D\` 快速切换主题

## 📚 文档支持

- **Markdown 渲染**: 完整的 Markdown 语法支持
- **代码高亮**: 多种编程语言语法高亮
- **表格支持**: 美观的表格样式
- **链接处理**: 自动识别和优化内部链接

## 🔍 搜索功能

- **实时搜索**: 输入即时显示搜索结果
- **模糊匹配**: 支持模糊搜索和部分匹配
- **搜索高亮**: 搜索结果中高亮关键词

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| \`Ctrl/Cmd + K\` | 聚焦搜索框 |
| \`Ctrl/Cmd + D\` | 切换主题 |
| \`ESC\` | 关闭侧边栏（移动端） |

## 📱 移动端优化

- **触摸友好**: 针对触摸设备优化的交互
- **滑动导航**: 支持滑动操作
- **自适应布局**: 根据屏幕尺寸自动调整

## 🔧 自定义配置

- **CSS 变量**: 易于自定义的颜色和尺寸
- **模块化 JS**: 可扩展的功能模块
- **配置选项**: 灵活的配置选项

## 即将推出

- [ ] 文档版本管理
- [ ] 在线编辑功能
- [ ] 文档评论系统
- [ ] 更多主题选项
- [ ] 多语言支持`,

            'api.md': `# API 文档

本文档介绍 YHPhotos 文档站的 API 接口和配置选项。

## 核心类: DocsApp

\`\`\`javascript
const app = new DocsApp();
\`\`\`

### 方法

#### setTheme(theme)

设置应用主题

**参数:**
- \`theme\` (string): 'light' 或 'dark'

**示例:**
\`\`\`javascript
app.setTheme('dark');
\`\`\`

#### loadDocument(fileName)

加载指定文档

**参数:**
- \`fileName\` (string): 文档文件名

**示例:**
\`\`\`javascript
app.loadDocument('getting-started.md');
\`\`\`

#### toggleSidebar()

切换侧边栏显示状态

**示例:**
\`\`\`javascript
app.toggleSidebar();
\`\`\`

## 配置选项

### 自定义样式

您可以通过修改 CSS 变量来自定义外观：

\`\`\`css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --sidebar-width: 280px;        /* 侧边栏宽度 */
    --header-height: 60px;         /* 头部高度 */
}
\`\`\`

### 自定义文档

在 \`index.html\` 中修改导航链接：

\`\`\`html
<li class="nav-item">
    <a href="#custom" data-file="custom.md">
        <i class="fas fa-star"></i>
        <span>自定义文档</span>
    </a>
</li>
\`\`\`

## 事件监听

应用支持以下事件：

- **文档加载完成**: 监听 \`docs:loaded\` 事件
- **主题切换**: 监听 \`theme:changed\` 事件
- **侧边栏状态变更**: 监听 \`sidebar:toggled\` 事件

**示例:**
\`\`\`javascript
document.addEventListener('docs:loaded', (e) => {
    console.log('文档已加载:', e.detail.fileName);
});
\`\`\`

## 扩展开发

### 添加自定义功能

\`\`\`javascript
// 扩展 DocsApp 类
class CustomDocsApp extends DocsApp {
    constructor() {
        super();
        this.setupCustomFeatures();
    }
    
    setupCustomFeatures() {
        // 添加您的自定义功能
    }
}
\`\`\`

### 插件系统

未来版本将支持插件系统，允许第三方扩展功能。`,

            'examples.md': `# 使用示例

以下是一些常见的使用场景和代码示例。

## 基本使用

### 创建简单的文档页面

\`\`\`markdown
# 我的第一个文档

这是文档的内容。

- 列表项 1
- 列表项 2

\`\`\`javascript
console.log('Hello World!');
\`\`\`
\`\`\`

### 高级 Markdown 语法

\`\`\`markdown
## 表格示例

| 功能 | 描述 | 状态 |
|------|------|------|
| 搜索 | 文档搜索 | ✅ |
| 主题 | 明暗主题 | ✅ |
| 响应式 | 移动端适配 | ✅ |

## 代码块示例

\`\`\`python
def hello_world():
    print("Hello, World!")
    return True
\`\`\`

## 引用示例

> 这是一个重要的提示。
> 
> 您可以在引用中添加多行内容。
\`\`\`

## 集成示例

### 与现有项目集成

\`\`\`html
<!-- 在现有页面中嵌入文档 -->
<div id="docs-container">
    <div class="docs-sidebar"></div>
    <div class="docs-content"></div>
</div>

<script src="path/to/docs-app.js"></script>
<script>
    const docs = new DocsApp({
        container: '#docs-container',
        defaultDocument: 'home.md'
    });
</script>
\`\`\`

### 动态加载文档

\`\`\`javascript
// 动态加载多个文档
async function loadMultipleDocs() {
    const docs = ['intro.md', 'guide.md', 'api.md'];
    
    for (const doc of docs) {
        await app.loadDocument(doc);
        console.log(\`已加载: \${doc}\`);
    }
}
\`\`\`

### 自定义主题

\`\`\`javascript
// 应用自定义主题
function setCustomTheme() {
    document.documentElement.style.setProperty('--primary-color', '#ff6b6b');
    document.documentElement.style.setProperty('--accent-color', '#4ecdc4');
}
\`\`\`

## 故障排除

### 常见问题

**Q: 文档无法加载？**
A: 检查文件路径是否正确，确保 Markdown 文件在 \`docs/\` 目录下。

**Q: 样式显示异常？**
A: 确认 CSS 文件路径正确，检查浏览器控制台是否有错误。

**Q: 移动端显示问题？**
A: 确保添加了视口元标签，测试不同设备上的显示效果。

### 调试技巧

\`\`\`javascript
// 启用调试模式
localStorage.setItem('docs-debug', 'true');

// 监听错误事件
document.addEventListener('error', (e) => {
    console.error('文档错误:', e.detail);
});
\`\`\`

## 性能优化

### 懒加载文档

\`\`\`javascript
// 实现懒加载
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const file = entry.target.getAttribute('data-file');
            app.loadDocument(file);
        }
    });
});
\`\`\`

### 缓存策略

\`\`\`javascript
// 启用文档缓存
app.enableCache = true;
app.cacheSize = 10; // 最大缓存 10 个文档
\`\`\`

这些示例展示了如何使用和扩展 YHPhotos 文档站的各种功能。`
        };

        return defaultContents[fileName] || `# ${this.getFileTitle(fileName)}

这是文档 **${fileName}** 的默认内容。

您可以：

1. 在 docs/ 目录下创建这个文件
2. 修改导航链接指向其他文档
3. 享受使用 YHPhotos 文档站！

---

> 提示：这是一个默认模板，您可以根据需要修改内容。`;
    }

    // 获取文件标题
    getFileTitle(fileName) {
        const titles = {
            'welcome.md': '欢迎使用',
            'CoC.md': 'Code of Conduct - 行为准则'
        };
        return titles[fileName] || fileName.replace('.md', '');
    }

    // 处理内部链接
    processInternalLinks(container) {
        const links = container.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // 代码高亮
    highlightCode(container) {
        const codeBlocks = container.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            if (typeof hljs !== 'undefined') {
                hljs.highlightElement(block);
            }
        });
    }

    // 生成导航（如果需要动态生成）
    generateNavigation() {
        // 这里可以添加动态生成导航的逻辑
        // 目前导航是静态的，但保留接口以供扩展
    }

    // 搜索功能
    handleSearch(query) {
        const navItems = document.querySelectorAll('.nav-item');
        const searchTerm = query.toLowerCase().trim();

        navItems.forEach(item => {
            const link = item.querySelector('a');
            const text = link.textContent.toLowerCase();
            
            if (searchTerm === '' || text.includes(searchTerm)) {
                item.style.display = '';
                item.classList.remove('search-hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('search-hidden');
            }
        });

        // 如果没有搜索结果，显示提示
        const visibleItems = document.querySelectorAll('.nav-item:not(.search-hidden)');
        this.updateSearchResults(visibleItems.length, searchTerm);
    }

    // 更新搜索结果
    updateSearchResults(count, query) {
        // 可以在这里添加搜索结果统计显示
        console.log(`搜索 "${query}" 找到 ${count} 个结果`);
    }

    // 侧边栏操作
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            sidebar.classList.toggle('open');
            this.toggleMobileOverlay();
        } else {
            this.sidebarCollapsed = !this.sidebarCollapsed;
            sidebar.classList.toggle('collapsed');
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
        this.removeMobileOverlay();
    }

    toggleMobileOverlay() {
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                this.closeSidebar();
            });
        }
        
        overlay.classList.toggle('active');
    }

    removeMobileOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // 设置活跃导航项
    setActiveNav(navItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        navItem?.classList.add('active');
    }

    // 主题切换（快捷键）
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    // 检查并应用基于时间的主题
    checkAndApplyTimeBasedTheme() {
        if (!this.autoThemeEnabled) return;

        const now = new Date();
        const currentHour = now.getHours();

        // 晚上7点后切换到深色主题，早上7点后切换到浅色主题
        let shouldBeDark = false;
        
        if (currentHour >= 19 || currentHour < 7) {
            // 19:00-06:59 使用深色主题
            shouldBeDark = true;
        } else {
            // 07:00-18:59 使用浅色主题
            shouldBeDark = false;
        }

        const targetTheme = shouldBeDark ? 'dark' : 'light';
        
        if (this.currentTheme !== targetTheme) {
            console.log(`检测到时间变更 (${currentHour}:00)，自动切换到${shouldBeDark ? '深色' : '浅色'}主题`);
            this.setTheme(targetTheme);
        }
    }

    // 初始化自动主题切换
    initAutoThemeToggle() {
        // 创建一个定时器，每分钟检查一次时间
        setInterval(() => {
            this.checkAndApplyTimeBasedTheme();
        }, 60000); // 每分钟检查一次

        // 页面可见性变化时也检查
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.checkAndApplyTimeBasedTheme();
            }
        });

        // 窗口焦点变化时也检查
        window.addEventListener('focus', () => {
            this.checkAndApplyTimeBasedTheme();
        });
    }

    // 切换自动主题模式
    toggleAutoTheme() {
        this.autoThemeEnabled = !this.autoThemeEnabled;
        localStorage.setItem('auto-theme-enabled', this.autoThemeEnabled.toString());
        
        // 更新按钮状态
        this.updateAutoThemeButton();
        
        if (this.autoThemeEnabled) {
            this.checkAndApplyTimeBasedTheme();
            this.showNotification('已开启自动主题切换', 'success');
        } else {
            this.showNotification('已关闭自动主题切换', 'info');
        }
    }

    // 更新自动主题按钮状态
    updateAutoThemeButton() {
        const button = document.getElementById('autoThemeToggle');
        if (button) {
            const icon = button.querySelector('i');
            if (this.autoThemeEnabled) {
                button.classList.add('active');
                icon.className = 'fas fa-clock';
                button.title = '自动主题切换 (已启用)';
            } else {
                button.classList.remove('active');
                icon.className = 'fas fa-clock';
                button.title = '自动主题切换 (已禁用)';
            }
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 响应式处理
    handleResize() {
        const sidebar = document.getElementById('sidebar');
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            sidebar.classList.remove('open');
            this.removeMobileOverlay();
        }
    }

    // 错误处理
    showError(message) {
        const contentDiv = document.getElementById('markdownContent');
        if (contentDiv) {
            contentDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// 当页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.docsApp = new DocsApp();
});

// 导出类供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocsApp;
}