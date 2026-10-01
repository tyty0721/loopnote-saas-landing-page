(function () {
  'use strict';
  const content = window.LOOPNOTE_CONTENT;
  let language = 'en', selected = 0, selectedPlan = null, dialogTrigger = null;
  let taskState = content.en.meetings.map(meeting => meeting.tasks.map(task => task.done));
  const $ = selector => document.querySelector(selector);
  const copy = () => content[language];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const dialog = $('#plan-dialog');
  const menuButton = $('#menu-toggle');

  function updateStaticCopy() {
    const c = copy();
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = c.title;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = c[element.dataset.i18n];
      if (typeof value !== 'string') throw new Error('Missing copy: ' + element.dataset.i18n);
      element.replaceChildren(...value.split('\n').flatMap((line, index) => index ? [document.createElement('br'),document.createTextNode(line)] : [document.createTextNode(line)]));
    });
    $('#language-label').textContent = language === 'en' ? '中文' : 'EN';
    $('#language-toggle').setAttribute('aria-label', c.languageLabel);
    $('#navigation').setAttribute('aria-label',c.navLabel);
    $('footer nav').setAttribute('aria-label',c.footerNavLabel);
    $('.integration-tools').setAttribute('aria-label',c.integrationLabel);
    $('.site-header .brand').setAttribute('aria-label',c.homeLabel);
    $('#meeting-tabs').setAttribute('aria-label',c.sampleMeetings);
    $('#close-dialog').setAttribute('aria-label',c.closeDialog);
    menuButton.setAttribute('aria-label',menuButton.getAttribute('aria-expanded') === 'true' ? c.closeMenu : c.openMenu);
  }

  function renderMeetings() {
    const c = copy();
    $('#meeting-tabs').innerHTML = c.meetings.map((meeting,index) => `<button class="meeting-tab" type="button" role="tab" id="meeting-${index}" data-meeting="${index}" aria-controls="meeting-panel" aria-selected="${selected === index}" tabindex="${selected === index ? 0 : -1}"><span class="meeting-tab-title">${escape(meeting.short)}</span><small>${escape(meeting.tabMeta)}</small></button>`).join('');
    renderPanel();
  }

  function renderPanel() {
    const c = copy(), meeting = c.meetings[selected], state = taskState[selected];
    const complete = state.filter(Boolean).length;
    $('#meeting-panel').setAttribute('aria-labelledby','meeting-' + selected);
    $('#meeting-panel').innerHTML = `<div class="meeting-heading"><div><h3>${escape(meeting.title)}</h3><p>${escape(meeting.meta)}</p></div><span class="meeting-type">${escape(meeting.type)}</span></div><p class="meeting-notes"><b>${escape(c.meetingNotes)}:</b> ${escape(meeting.notes)}</p><div class="meeting-columns"><div><h4>${escape(c.summary)}</h4><p class="meeting-summary">${escape(meeting.summary)}</p></div><div><h4>${escape(c.decisions)}</h4><ul class="decision-list">${meeting.decisions.map(decision => `<li>${escape(decision)}</li>`).join('')}</ul></div></div><div class="task-section"><div class="task-header"><h4>${escape(c.tasks)}</h4><div class="task-progress"><span>${complete} / ${state.length} ${escape(c.completed)}</span><span class="progress-track" aria-hidden="true"><span style="width:${complete/state.length*100}%"></span></span></div></div><div class="task-list">${meeting.tasks.map((task,index) => `<div class="demo-task${state[index] ? ' done' : ''}"><button class="task-toggle" type="button" data-task="${index}" aria-pressed="${state[index]}" aria-label="${escape((state[index] ? c.markIncomplete : c.markComplete) + ': ' + task.title)}">${state[index] ? '✓' : ''}</button><div class="task-copy"><b>${escape(task.title)}</b><small>${escape(c.owner)}: ${escape(task.owner)}</small></div><span class="task-due">${escape(task.due)}</span></div>`).join('')}</div></div>`;
  }

  function renderPricing() {
    const c = copy();
    $('#pricing-cards').innerHTML = content.plans.map(plan => `<article class="pricing-card${plan.id === 'pro' ? ' featured' : ''}">${plan.id === 'pro' ? `<span class="plan-tag">${escape(c.proTag)}</span>` : ''}<h3 class="plan-name">${plan.name}</h3><p class="plan-description">${escape(c.planDescriptions[plan.id])}</p><div class="plan-price"><strong>$${plan.price}</strong><span>${escape(plan.id === 'free' ? c.freeUnit : c.perUser)}</span></div><ul class="plan-features">${c.planFeatures[plan.id].map(feature => `<li>${escape(feature)}</li>`).join('')}</ul><button class="button plan-button" type="button" data-plan="${plan.id}">${escape(c.explorePlan.replace('{plan}',plan.name))}</button></article>`).join('');
  }

  function renderFaq() {
    const open = new Set(Array.from(document.querySelectorAll('.faq-question[aria-expanded="true"]')).map(button => button.dataset.faq));
    $('#faq-list').innerHTML = copy().faqs.map((faq,index) => `<div class="faq-item"><h3><button type="button" class="faq-question" data-faq="${index}" aria-expanded="${open.has(String(index))}" aria-controls="faq-answer-${index}" id="faq-question-${index}"><span>${escape(faq.q)}</span><span class="faq-symbol" aria-hidden="true">${open.has(String(index)) ? '−' : '+'}</span></button></h3><div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}"${open.has(String(index)) ? '' : ' hidden'}>${escape(faq.a)}</div></div>`).join('');
  }

  function updateDialog() {
    if (!selectedPlan) return;
    const plan = content.plans.find(item => item.id === selectedPlan);
    $('#dialog-title').textContent = plan.name;
    $('#dialog-price').textContent = '$' + plan.price + ' ' + (plan.id === 'free' ? copy().freeUnit : copy().perUser);
  }

  function setMenu(open) {
    $('#navigation').classList.toggle('open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open ? copy().closeMenu : copy().openMenu);
  }

  $('#language-toggle').addEventListener('click',() => {
    language = language === 'en' ? 'zh' : 'en';
    updateStaticCopy();renderMeetings();renderPricing();renderFaq();updateDialog();
  });
  menuButton.addEventListener('click',() => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $('#navigation').addEventListener('click',event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown',event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {setMenu(false);menuButton.focus();}
  });
  window.addEventListener('resize',() => {if (window.innerWidth > 650) setMenu(false);});

  $('#meeting-tabs').addEventListener('click',event => {
    const button = event.target.closest('[data-meeting]');
    if (!button) return;
    selected = Number(button.dataset.meeting);renderMeetings();$('#meeting-' + selected).focus();
  });
  $('#meeting-tabs').addEventListener('keydown',event => {
    const button = event.target.closest('[data-meeting]');
    if (!button || !['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') selected = 0;
    else if (event.key === 'End') selected = copy().meetings.length - 1;
    else selected = (selected + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + copy().meetings.length) % copy().meetings.length;
    renderMeetings();$('#meeting-' + selected).focus();
  });
  $('#meeting-panel').addEventListener('click',event => {
    const button = event.target.closest('[data-task]');
    if (!button) return;
    const index = Number(button.dataset.task);
    taskState[selected][index] = !taskState[selected][index];renderPanel();
    $(`[data-task="${index}"]`).focus();
    $('#demo-status').textContent = copy().meetings[selected].tasks[index].title + ': ' + (taskState[selected][index] ? copy().markComplete : copy().markIncomplete);
  });
  $('#reset-demo').addEventListener('click',() => {
    taskState = content.en.meetings.map(meeting => meeting.tasks.map(task => task.done));selected = 0;renderMeetings();$('#demo-status').textContent = copy().resetStatus;
  });
  $('#faq-list').addEventListener('click',event => {
    const button = event.target.closest('[data-faq]');
    if (!button) return;
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded',String(open));button.querySelector('.faq-symbol').textContent = open ? '−' : '+';
    $('#' + button.getAttribute('aria-controls')).hidden = !open;
  });
  $('#pricing-cards').addEventListener('click',event => {
    const button = event.target.closest('[data-plan]');
    if (!button) return;
    selectedPlan = button.dataset.plan;dialogTrigger = button;updateDialog();
    dialog.showModal();document.body.classList.add('dialog-open');$('#close-dialog').focus();
  });
  $('#close-dialog').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close',() => {document.body.classList.remove('dialog-open');if (dialogTrigger && document.contains(dialogTrigger)) dialogTrigger.focus();});
  $('#dialog-demo').addEventListener('click',() => {dialog.close();setTimeout(() => $('#meeting-panel').focus({preventScroll:true}),0);});
  updateStaticCopy();renderMeetings();renderPricing();renderFaq();
})();
