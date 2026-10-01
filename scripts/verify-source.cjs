/* Checks source contracts only; browser behavior must be tested separately. */
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const root = path.resolve(__dirname,'..');
function load(directory) {const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(directory,'assets/content.js'),'utf8'),c);return c.window.LOOPNOTE_CONTENT;}
const formal = load(root), revision = load(path.join(root,'revision-copy'));
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(match=>match[1]);
const checks=[];
function check(name, action) {action();checks.push({name,status:'passed'});}
check('All HTML content keys exist in both languages',()=>keys.forEach(key=>['en','zh'].forEach(lang=>assert.equal(typeof formal[lang][key],'string',key))));
check('English and Chinese use the same content keys',()=>assert.deepEqual(Object.keys(formal.en).sort(),Object.keys(formal.zh).sort()));
check('Official prices remain 0, 12, 29',()=>assert.equal(JSON.stringify(formal.plans.map(plan=>plan.price)),JSON.stringify([0,12,29])));
check('Three bilingual meetings share task counts, names and initial states',()=>{assert.equal(formal.en.meetings.length,3);assert.equal(formal.zh.meetings.length,3);formal.en.meetings.forEach((meeting,i)=>{assert.equal(meeting.tasks.length,3);assert.equal(meeting.tasks.length,formal.zh.meetings[i].tasks.length);meeting.tasks.forEach((task,j)=>{assert.equal(task.owner,formal.zh.meetings[i].tasks[j].owner);assert.equal(task.done,formal.zh.meetings[i].tasks[j].done);});});});
check('Five official FAQs and six revision FAQs in each language',()=>['en','zh'].forEach(lang=>{assert.equal(formal[lang].faqs.length,5);assert.equal(revision[lang].faqs.length,6);}));
check('Revision price and both subtitles updated independently',()=>{assert.equal(revision.plans[1].price,15);['en','zh'].forEach(lang=>{assert.notEqual(formal[lang].heroSubtitle,revision[lang].heroSubtitle);assert.ok(revision[lang].faqs[3].a.includes('$15'));assert.ok(formal[lang].faqs[3].a.includes('$12'));});});
check('Copy documents reflect official and revision price/subtitle/FAQ',()=>[[root,formal],[path.join(root,'revision-copy'),revision]].forEach(([directory,data])=>['en','zh'].forEach(lang=>{const md=fs.readFileSync(path.join(directory,`docs/copywriting-${lang}.md`),'utf8');assert.ok(md.includes(data[lang].heroSubtitle));assert.ok(md.includes(`### Pro — $${data.plans[1].price}`));data[lang].faqs.forEach(faq=>{assert.ok(md.includes(faq.q));assert.ok(md.includes(faq.a));});})));
check('All local stylesheet, scripts, icon and anchor targets exist',()=>{for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const link=match[1];if(link.startsWith('#'))assert.ok(new RegExp('id="'+link.slice(1)+'"').test(html),link);else assert.ok(fs.existsSync(path.join(root,link)),link);}});
check('No external resources, fetch, module imports or local storage',()=>{for(const file of ['index.html','assets/content.js','assets/app.js','assets/styles.css']){const source=fs.readFileSync(path.join(root,file),'utf8');assert.ok(!/https?:\/\/|fetch\s*\(|localStorage|sessionStorage|type="module"/.test(source),file);}});
const report={generatedAt:new Date().toISOString(),scope:'Static source and content checks only. This does not prove browser behavior or visual quality.',checks,revision:{officialPro:formal.plans[1].price,revisionPro:revision.plans[1].price,officialFaqCount:formal.en.faqs.length,revisionFaqCount:revision.en.faqs.length,enSubtitleBefore:formal.en.heroSubtitle,enSubtitleAfter:revision.en.heroSubtitle,zhSubtitleBefore:formal.zh.heroSubtitle,zhSubtitleAfter:revision.zh.heroSubtitle}};
fs.writeFileSync(path.join(root,'docs/source-checks.json'),JSON.stringify(report,null,2)+'\n');
console.log(`${checks.length} source checks passed. Evidence: docs/source-checks.json. Browser QA is separate.`);
