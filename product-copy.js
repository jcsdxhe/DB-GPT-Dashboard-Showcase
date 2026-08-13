(() => {
  const replacements = [
    ['Dashboard 最终交付态交互展厅', '经营分析工作台'],
    ['DB-GPT Agent 数据看板最终交付态交互目标原型', 'DB-GPT 数据看板的生成、编辑、刷新与发布工作台'],
    ['数据看板 / 最终交付态交互展厅', '数据看板 / 经营分析工作台'],
    ['交互目标原型', '经营分析'],
    ['重播生成', '生成记录'],
    ['平台能力 → 权限', '看板管理 → 权限'],
    ['平台能力', '看板管理'],
    ['DEMO', '示例'],
    ['DB-GPT Dashboard 交互展厅', 'DB-GPT 数据看板'],
    ['返回展厅', '返回数据看板'],
  ];

  const replace = value => {
    let updated = value;
    for (const [from, to] of replacements) updated = updated.replaceAll(from, to);
    return updated;
  };

  const rewriteText = root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const parent = node.parentElement;
      if (parent && !['SCRIPT', 'STYLE'].includes(parent.tagName)) {
        const updated = replace(node.nodeValue || '');
        if (updated !== node.nodeValue) node.nodeValue = updated;
      }
      node = walker.nextNode();
    }
  };

  const rewriteTitle = () => {
    const updated = replace(document.title);
    if (updated !== document.title) document.title = updated;
  };

  const rewrite = () => {
    rewriteTitle();
    const description = document.querySelector('meta[name="description"]');
    if (description?.content) description.content = replace(description.content);
    rewriteText(document.body);
  };

  const start = () => {
    rewrite();
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'characterData' && record.target.parentElement) rewriteText(record.target.parentElement);
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.parentElement) rewriteText(node.parentElement);
          if (node.nodeType === Node.ELEMENT_NODE) rewriteText(node);
        }
      }
      rewriteTitle();
    });
    observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });
  };

  if (document.readyState === 'complete') setTimeout(start, 0);
  else window.addEventListener('load', () => setTimeout(start, 0), { once: true });
})();
