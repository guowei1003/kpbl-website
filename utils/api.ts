import axios from 'axios';
import type { Rule, Tag } from '~/types';

// 创建API实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取所有规则
export async function getRules(): Promise<Rule[]> {
  try {
    // 临时使用静态数据，后期可以替换为真实接口
    return [
      {
        id: 1,
        description: '高质量的JavaScript代码规范，包含最佳实践和风格指南。',
        content: `You are a Senior Front-End Developer and an Expert in ReactJS, NextJS, JavaScript, TypeScript, HTML, CSS and modern UI/UX frameworks (e.g., TailwindCSS, Shadcn, Radix). You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

- Follow the user’s requirements carefully & to the letter.
- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.
- Confirm, then write code!
- Always write correct, best practice, DRY principle (Dont Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines .
- Focus on easy and readability code, over being performant.
- Fully implement all requested functionality.
- Leave NO todo’s, placeholders or missing pieces.
- Ensure code is complete! Verify thoroughly finalised.
- Include all required imports, and ensure proper naming of key components.
- Be concise Minimize any other prose.
- If you think there might not be a correct answer, you say so.
- If you do not know the answer, say so, instead of guessing.

### Coding Environment
The user asks questions about the following coding languages:
- ReactJS
- NextJS
- JavaScript
- TypeScript
- TailwindCSS
- HTML
- CSS

### Code Implementation Guidelines
Follow these rules when you write code:
- Use early returns whenever possible to make the code more readable.
- Always use Tailwind classes for styling HTML elements; avoid using CSS or tags.
- Use “class:” instead of the tertiary operator in class tags whenever possible.
- Use descriptive variable and function/const names. Also, event functions should be named with a “handle” prefix, like “handleClick” for onClick and “handleKeyDown” for onKeyDown.
- Implement accessibility features on elements. For example, a tag should have a tabindex=“0”, aria-label, on:click, and on:keydown, and similar attributes.
- Use consts instead of functions, for example, “const toggle = () =>”. Also, define a type if possible.`,
        author: {
          id: 1,
          name: '张三',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        publishTime: '2024-03-24T08:30:00Z',
        stats: {
          likes: 120,
        },
        tags: [
          { id: 1, name: 'JavaScript' }
        ]
      },
      {
        id: 2,
        description: 'TypeScript类型定义的最佳实践，让你的代码更健壮、可维护。',
        content: `# TypeScript类型最佳实践\n\n## 基础类型定义\n- 尽量使用具体类型而非any\n- 对象类型使用interface而非type\n- 尽量使用只读属性(readonly)保护数据\n\n## 高级类型技巧\n- 灵活使用泛型提高代码复用性\n- 使用联合类型和交叉类型组合类型\n- 运用类型收窄增强类型安全\n\n## 类型声明文件\n- 为第三方库创建声明文件(.d.ts)\n- 正确使用模块声明扩展已有类型\n\n## 最佳配置\n- 在tsconfig.json中启用strict模式\n- 开启noImplicitAny和strictNullChecks选项`,
        author: {
          id: 2,
          name: '李四',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        publishTime: '2024-03-23T14:20:00Z',
        stats: {
          likes: 95,
        },
        tags: [
          { id: 2, name: 'TypeScript' }
        ]
      },
      {
        id: 3,
        description: '如何进行高效的代码审查，提高代码质量并促进团队协作。',
        content: `# 代码审查指南\n\n## 审查重点\n- 代码质量和可读性\n- 潜在的bug和边缘情况\n- 性能问题\n- 安全隐患\n\n## 审查流程\n1. 阅读提交信息和需求背景\n2. 浏览整体代码结构\n3. 详细检查关键逻辑\n4. 提供具体、建设性的反馈\n\n## 沟通技巧\n- 关注代码而非作者\n- 使用提问式反馈\n- 及时回应和讨论`,
        author: {
          id: 3,
          name: '王五',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        publishTime: '2024-03-22T15:45:00Z',
        stats: {
          likes: 84,
        },
        tags: [
          { id: 1, name: 'JavaScript' },
          { id: 2, name: 'TypeScript' },
          { id: 9, name: 'DevOps' }
        ]
      },
      {
        id: 4,
        description: 'Vue 3组件设计模式与最佳实践，提升应用性能和开发效率。',
        content: `# Vue 3组件最佳实践\n\n## 组件设计原则\n- 遵循单一职责原则\n- 组件间保持低耦合高内聚\n- 区分状态性组件和展示性组件\n\n## Composition API使用\n- 使用setup函数或<script setup>语法\n- 合理使用响应式API (ref, reactive, computed)\n- 使用生命周期钩子函数替代选项式API\n\n## 性能优化\n- 使用v-memo减少不必要的重渲染\n- 为v-for列表设置适当的key\n- 使用suspense和异步组件处理加载状态\n\n## 状态管理\n- 小型应用使用provide/inject\n- 复杂应用考虑使用Pinia`,
        author: {
          id: 4,
          name: '赵六',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        publishTime: '2024-03-21T10:15:00Z',
        stats: {
          likes: 106,
        },
        tags: [
          { id: 4, name: 'Vue' },
          { id: 2, name: 'TypeScript' }
        ]
      }
    ];
    
    // 真实API调用可以使用下面的代码
    // const response = await api.get<Rule[]>('/rules');
    // return response.data;
  } catch (error) {
    console.error('Failed to fetch rules:', error);
    return [];
  }
}

// 获取单个规则
export async function getRule(id: number): Promise<Rule | null> {
  try {
    // 临时实现，真实API调用时切换
    const rules = await getRules();
    const rule = rules.find(r => r.id === id);
    return rule || null;
    
    // 真实API调用
    // const response = await api.get<Rule>(`/rules/${id}`);
    // return response.data;
  } catch (error) {
    console.error(`Failed to fetch rule with id ${id}:`, error);
    return null;
  }
}

// 获取所有标签
export async function getTags(): Promise<Tag[]> {
  try {
    // 临时数据
    return [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'React' },
      { id: 4, name: 'Vue' },
      { id: 5, name: 'CSS' },
      { id: 6, name: 'HTML' },
      { id: 7, name: 'Node.js' },
      { id: 8, name: 'Python' },
      { id: 9, name: 'DevOps' },
    ];
    
    // 真实API调用
    // const response = await api.get<Tag[]>('/tags');
    // return response.data;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

export default {
  getRules,
  getRule,
  getTags,
}; 