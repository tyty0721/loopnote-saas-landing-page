/* Optional development helper. Node.js is not needed to open the website. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
function readContent(directory) {
  const context = {window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(directory,'assets/content.js'),'utf8'),context);
  return context.window.LOOPNOTE_CONTENT;
}
function writeCopy(directory, data) {
  fs.mkdirSync(path.join(directory,'docs'),{recursive:true});
  for (const language of ['en','zh']) {
    const c = data[language];
    let output = `# LoopNote — ${language === 'en' ? 'English website copy' : '中文页面文案'}\n\nGenerated from assets/content.js. This document mirrors the delivered content source.\n\n`;
    output += '## Shared interface and page copy\n\n';
    for (const [key,value] of Object.entries(c)) if (typeof value === 'string') output += `### ${key}\n\n${value}\n\n`;
    output += '## Plan comparison\n\n';
    for (const plan of data.plans) {
      output += `### ${plan.name} — $${plan.price} ${plan.id === 'free' ? c.freeUnit : c.perUser}\n\n${c.planDescriptions[plan.id]}\n\n`;
      output += c.planFeatures[plan.id].map(item => '- ' + item).join('\n') + '\n\n';
      output += c.explorePlan.replace('{plan}',plan.name) + '\n\n';
    }
    output += '## Frequently asked questions\n\n';
    c.faqs.forEach(faq => {output += `### ${faq.q}\n\n${faq.a}\n\n`;});
    output += '## Preset meeting data\n\n';
    c.meetings.forEach(meeting => {
      output += `### ${meeting.title}\n\n${meeting.short} · ${meeting.tabMeta}\n\n${meeting.meta} · ${meeting.type}\n\n**${c.meetingNotes}:** ${meeting.notes}\n\n**${c.summary}:** ${meeting.summary}\n\n**${c.decisions}:**\n\n`;
      output += meeting.decisions.map(item => '- ' + item).join('\n') + '\n\n';
      output += `**${c.tasks}:**\n\n` + meeting.tasks.map(task => `- ${task.title} — ${c.owner}: ${task.owner} · ${task.due} · ${task.done ? c.markComplete : c.markIncomplete}`).join('\n') + '\n\n';
    });
    fs.writeFileSync(path.join(directory,`docs/copywriting-${language}.md`),output);
  }
}
const data = readContent(root);
writeCopy(root,data);
const revision = path.join(root,'revision-copy');
fs.mkdirSync(path.join(revision,'assets'),{recursive:true});
fs.copyFileSync(path.join(root,'index.html'),path.join(revision,'index.html'));
for (const file of ['styles.css','app.js','favicon.svg']) fs.copyFileSync(path.join(root,'assets',file),path.join(revision,'assets',file));
const changed = JSON.parse(JSON.stringify(data));
changed.plans.find(plan => plan.id === 'pro').price = 15;
changed.en.heroSubtitle = 'Bring meeting context, decisions, and clear ownership together—then use one shared view to plan the follow-up.';
changed.zh.heroSubtitle = '把会议背景、决策和任务分工放在一起，让团队通过同一份清楚的记录安排后续工作。';
changed.en.faqs[3].a = changed.en.faqs[3].a.replace('$12','$15');
changed.zh.faqs[3].a = changed.zh.faqs[3].a.replace('$12','$15');
changed.en.faqs.push({q:'Can I reset my changes in the sample workspace?',a:'Yes. Reset demo restores all three meetings and their original task states. It does not affect a real account because no account exists in this demo.'});
changed.zh.faqs.push({q:'可以重置示例工作区中的修改吗？',a:'可以。点击「重置演示」会恢复三组会议与原始任务状态。本演示没有真实账户，因此不会影响任何账户数据。'});
fs.writeFileSync(path.join(revision,'assets/content.js'),'/* Independent simulated client revision. Not the official $12 delivery. */\nwindow.LOOPNOTE_CONTENT = ' + JSON.stringify(changed,null,2) + ';\n');
writeCopy(revision,changed);
fs.writeFileSync(path.join(revision,'README.md'),'# Simulated client revision\n\nThis separate example implements a client request: Pro changes from $12 to $15, both hero subtitles change, and a sixth FAQ is added. Open index.html locally. No live service or external action is involved.\n\nThe official website one directory above remains at $12. Do not include this directory in the official website delivery ZIP.\n\nChinese: 本目录是独立的模拟修改副本，正式版本仍在上级目录，Pro 价格为 $12。\n');
fs.writeFileSync(path.join(revision,'docs/product-brief.md'),'# Product brief — simulated revision only\n\nFictional product: LoopNote. Target: project owners in 5–50-person remote/hybrid teams. Concept: meeting summaries, decisions, action items, owners and due dates.\n\n- Free: $0; 5 meetings/month.\n- Pro: $15/user/month in this revision only.\n- Team: $29/user/month.\n- Notion, Slack, Jira are concept target tools; no real integration.\n- Three preset meetings; no recording, transcription, API, account or payment.\n- Updated hero subtitle and sixth FAQ are reflected in both language copy documents.\n');
console.log('Generated bilingual copy and independent revision-copy.');
module.exports = {readContent,writeCopy};
