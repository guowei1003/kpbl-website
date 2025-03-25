<template>
  <div v-html="safeContent" class="formatted-content"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import markdownit from 'markdown-it'
import DOMPurify from 'dompurify'

const props = defineProps<{
  content: string
}>()

// 创建markdown解析器
const md = new markdownit({
  html: false, // 禁用原始HTML以避免XSS
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 对代码块进行安全处理
    const escapedStr = String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return `<pre class="code-block"><code>${escapedStr}</code></pre>`;
  }
})

// 安全处理链接，添加noopener和noreferrer
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const targetIndex = token.attrIndex('target');
  const relIndex = token.attrIndex('rel');
  
  if (targetIndex < 0) {
    token.attrPush(['target', '_blank']);
  }
  
  if (relIndex < 0) {
    token.attrPush(['rel', 'noopener noreferrer']);
  } else if (token.attrs) {
    token.attrs[relIndex][1] = 'noopener noreferrer';
  }
  
  return self.renderToken(tokens, idx, options);
};

// 格式化内容
const formattedContent = computed(() => {
  try {
    return md.render(props.content);
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return String(props.content)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})

// 安全的内容（使用DOMPurify进行XSS防御）
const safeContent = computed(() => {
  return DOMPurify.sanitize(formattedContent.value, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
      'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'del', 'span'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    ALLOW_DATA_ATTR: false
  });
})
</script>

<style>
.formatted-content {
  line-height: 1.6;
}

.formatted-content pre {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin: 1rem 0;
}

.formatted-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9em;
}

.formatted-content p {
  margin: 0.75rem 0;
}

.formatted-content h1, 
.formatted-content h2, 
.formatted-content h3, 
.formatted-content h4, 
.formatted-content h5, 
.formatted-content h6 {
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.formatted-content h1 { font-size: 1.8em; }
.formatted-content h2 { font-size: 1.5em; }
.formatted-content h3 { font-size: 1.3em; }
.formatted-content h4 { font-size: 1.2em; }
.formatted-content h5 { font-size: 1.1em; }
.formatted-content h6 { font-size: 1em; }

.formatted-content ul, 
.formatted-content ol {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

.formatted-content li {
  margin: 0.25rem 0;
}

.formatted-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6b7280;
}

.dark .formatted-content pre {
  background-color: rgba(255, 255, 255, 0.1);
}

.dark .formatted-content blockquote {
  border-left-color: #4b5563;
  color: #9ca3af;
}
</style> 