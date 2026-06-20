import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    // 阻止点击事件冒泡到卡片，避免复制时触发卡片折叠
    e.stopPropagation();
    const textToCopy = project.promptTemplate;

    // 现代 Clipboard API 方案
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch (err) {
        console.warn('Clipboard API 复制失败，启用备用方案：', err);
      }
    }

    // 传统浏览器与移动端 Webview 兼容方案 (Fallback)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      // 样式设在屏幕外隐藏，避免页面滚动
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      // 针对 iOS 设备的兼容选择范围
      textArea.setSelectionRange(0, 99999);
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        throw new Error('execCommand 返回复制失败');
      }
    } catch (err) {
      console.error('所有复制方案均失败：', err);
      alert('由于浏览器限制，一键复制失败。请在文本框内手动长按并复制。');
    }
  };

  return (
    <div 
      className="project-card" 
      onClick={() => setIsOpen(!isOpen)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        {/* 卡片标题级别修改为 h3，符合语义化 HTML5 结构 */}
        <h3 className="card-title">{project.title}</h3>
        <span className="card-badge">{project.tag}</span>
      </div>
      
      <div className="card-info-row">
        <span className="difficulty-badge">{project.difficulty}</span>
        <span style={{ fontSize: '17px', color: 'var(--text-muted)', fontWeight: 'bold' }}>
          {isOpen ? '点击收起详情 ▲' : '点击查看详细步骤与免费模板 ▼'}
        </span>
      </div>

      <div className="card-desc">
        {project.desc}
      </div>

      {!isOpen && (
        <div style={{ marginTop: '20px' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', fontSize: '19px', borderRadius: '12px' }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            查看详细步骤与免费模板 ▼
          </button>
        </div>
      )}

      {isOpen && (
        <div className="card-details" onClick={(e) => e.stopPropagation()}>
          {/* 使用的开源工具 */}
          <div className="detail-section">
            {/* 卡片子项标题修改为 h4 */}
            <h4 className="detail-title">🛠️ 所需开源工具（全部免费）</h4>
            <div className="tools-list">
              {project.tools.map((tool, index) => (
                <span key={index} className="tool-tag">{tool}</span>
              ))}
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="detail-section">
            {/* 卡片子项标题修改为 h4 */}
            <h4 className="detail-title">👣 详细操作步骤（照着做即可）</h4>
            <ul className="steps-list">
              {project.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          {/* 配置文件模板 */}
          <div className="detail-section">
            {/* 卡片子项标题修改为 h4 */}
            <h4 className="detail-title">📋 免费配置文件/话术模板</h4>
            <div className="template-box">
              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✅ 复制成功！快去粘贴吧' : '📋 点击一键复制模板'}
              </button>
              <pre className="template-content">{project.promptTemplate}</pre>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '-8px', paddingLeft: '4px' }}>
              * 提示：点击右上角橘黄色大按钮可以直接复制整段文字，无需手动选择。
            </p>
          </div>

          {/* 变现与定价策略 */}
          <div className="detail-section">
            {/* 卡片子项标题修改为 h4 */}
            <h4 className="detail-title">💰 变现与定价策略（教你如何收钱）</h4>
            <div className="pricing-card">
              {project.pricingStrategy}
            </div>
          </div>

          {/* 收起按钮 */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              className="btn btn-accent" 
              onClick={() => setIsOpen(false)}
              style={{ width: '100%', maxWidth: '350px', fontSize: '19px', padding: '14px', borderRadius: '12px' }}
            >
              收起详情 ▲
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
