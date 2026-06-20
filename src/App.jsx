import { useState } from 'react';
import { projects } from './data/projects';
import ProjectCard from './components/ProjectCard';
import './App.css'; // 保留引用，虽然已清空

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // 改进的多关键词过滤逻辑（“与”逻辑）：支持按空格拆分关键词，匹配所有条件
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;

    // 按空格切分，并过滤掉空字符串
    const keywords = searchLower.split(/\s+/).filter(k => k.length > 0);
    if (keywords.length === 0) return true;

    // 检查项目是否包含了所有切分出来的关键词
    return keywords.every(keyword => {
      const matchTitle = project.title.toLowerCase().includes(keyword);
      const matchDesc = project.desc.toLowerCase().includes(keyword);
      const matchTag = project.tag.toLowerCase().includes(keyword);
      const matchTools = project.tools.some(tool => tool.toLowerCase().includes(keyword));
      
      return matchTitle || matchDesc || matchTag || matchTools;
    });
  });

  return (
    <>
      {/* 头部大横幅 - 网站主标题 h1 */}
      <header>
        <div className="container">
          <h1>🚀 AI 启航变现站</h1>
          <p>专为非技术人员与中年创业者打造的开源 AI 变现实战指南 · 纯干货无广告</p>
        </div>
      </header>

      {/* 搜索框区域 */}
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="输入你想用 AI 做什么？（例如：自动回复 微信）"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '0 8px',
                fontWeight: 'bold'
              }}
            >
              清除
            </button>
          )}
        </div>
      </div>

      {/* 主体卡片区 */}
      <main className="container" style={{ flex: 1 }}>
        
        {/* 新增的分类标题 h2 - 🔥 快速变现项目库 */}
        <h2 className="section-title">🔥 快速变现项目库</h2>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', margin: '20px 0' }}>
              <p style={{ fontSize: '20px', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                🔍 没有找到同时包含所有关键词的项目。
              </p>
              <p style={{ fontSize: '17px', color: 'var(--text-muted)', marginTop: '8px' }}>
                您可以尝试换个词或者减少关键词，例如：<strong>微信</strong>、<strong>老照片</strong> 或 <strong>自媒体</strong>。
              </p>
              <button 
                className="btn btn-primary" 
                onClick={() => setSearchTerm('')}
                style={{ marginTop: '20px' }}
              >
                显示全部项目
              </button>
            </div>
          )}
        </div>

        {/* 常见问题解答 h2 - 💡 常见问题解答 FAQ */}
        <section className="faq-section" style={{ marginTop: '50px' }}>
          <h2 className="faq-main-title">💡 常见问题解答 (FAQ)</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-question">Q1: “我年龄偏大，学这个会不会太迟了？”</div>
              <div className="faq-answer">
                <strong>答：</strong>不需要学写代码或复杂画图。只需学会打字和复制粘贴，跟着我们的傻瓜视频多点几遍，今天学，明天就能给本地商户做自动回复。
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-question">Q2: “使用这些工具要收费吗？”</div>
              <div className="faq-answer">
                <strong>答：</strong>我们推荐的所有开源工具都是 100% 免费或有极大免费额度的。只有当你变现稳定后，为商户买云服务器才需要每月出 20-30 元，而这笔钱可以让商户承担。
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-question">Q3: “这种 AI 变现靠谱吗，会不会是骗局？”</div>
              <div className="faq-answer">
                <strong>答：</strong>任何让你交钱加盟、声称挂机就能日赚几百的都是骗局。我们不收你一分钱，我们教的是让你用技术帮本地商户实打实地节省人工、提供实物照片修复。这是一分劳动一分收获的实体服务。
              </div>
            </div>
          </div>
        </section>

        {/* 防坑专区 h2 - ❌ 中老年防坑指南 */}
        <section className="anti-trap-section">
          <h2 className="anti-trap-title">❌ 中老年创业：AI 避坑防骗指南</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center' }}>
            AI 技术是用来帮我们省力赚钱的，但市场上有很多针对不懂技术的人设下的陷阱。请务必记住以下几点：
          </p>
          
          <div className="traps-grid">
            <div className="trap-card">
              <div className="trap-header">❌ 陷阱一：高额的“AI 培训费”与“加盟费”</div>
              <div className="trap-desc">
                <strong>真相：</strong>很多机构宣称“交 2999 元带你月入过万”，进去后只教你最基础的聊天。本站推荐的工具（如 Dify、Kimi、GFP-GAN）全部都是开源且免费的，多动手多看文档就能学会，千万不要交高额加盟费！
              </div>
            </div>

            <div className="trap-card">
              <div className="trap-header">❌ 陷阱二：购买极贵的“高配置云服务器”</div>
              <div className="trap-desc">
                <strong>真相：</strong>有些博主推荐你买几百块一个月的高端服务器。实际上，帮商家托管微信助手或做小脚本，腾讯云或阿里云每月 20 - 30 元的<strong>轻量应用服务器</strong>已经完全够用，等生意做大了再升级！
              </div>
            </div>

            <div className="trap-card">
              <div className="trap-header">❌ 陷阱三：所谓的“万能 AI 赚钱软件”</div>
              <div className="trap-desc">
                <strong>真相：</strong>市面上很多包装出来的“一键挂机赚钱软件”，大都是骗局。变现需要你为本地商户真正解决问题（如帮老板省下客服时间，帮顾客还原老照片）。服务有价值，老板才愿意付钱。
              </div>
            </div>

            <div className="trap-card">
              <div className="trap-header">❌ 陷阱四：泄露个人或客户的敏感账号密码</div>
              <div className="trap-desc">
                <strong>真相：</strong>在部署微信助手时，AI 会登录托管的微信号。切记不要使用自己常用的主力微信号，务必用注册好的<strong>闲置微信号</strong>，并且绝对不要把含有微信密码的配置文件发送给任何所谓的“技术协助网友”。
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer>
        <div className="container">
          <p>© 2026 AI 启航变现站 · 助您用开源 AI 开启轻量创业之路</p>
          <p style={{ fontSize: '14px', marginTop: '6px', opacity: 0.8 }}>
            本项目所提及的开源技术如 Dify、chatgpt-on-wechat 等均为其原作者所有。请在法律合规范围内使用 AI 技术。
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
