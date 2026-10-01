# Simulated client revision

2026-10-01 · Independent local exercise, not a real client instruction or commercial result.

## Request

Change the concept Pro price from $12 to $15 per user per month, replace the hero subtitle, and add a FAQ explaining how to reset the sample workspace. Apply all three changes in English and Simplified Chinese. Keep the official website at its original $12 price.

## Implementation

The executable helper `scripts/build-docs.cjs` builds a separate `revision-copy/` from the same original layout and interaction scripts, writes a distinct revised content file, and exports matching revised English and Chinese copy. The revision has its own brief and README. The official shared price data stays $12.

| Item | Official | Independent revision |
|---|---|---|
| Pro | $12/user/month | $15/user/month |
| FAQ count | 5 per language | 6 per language |
| English subtitle | Turn meeting notes into a clear summary, decisions, and tasks—so everyone knows what comes next, and who owns it. | Bring meeting context, decisions, and clear ownership together—then use one shared view to plan the follow-up. |
| 中文副标题 | 把会议笔记整理成摘要、决策和任务，让每个人都知道接下来做什么、由谁负责。 | 把会议背景、决策和任务分工放在一起，让团队通过同一份清楚的记录安排后续工作。 |

The FAQ that mentions the three prices was updated along with the Pro card. Pricing dialogs use the same price array, so the revision source supplies $15 without duplicating price literals in the app. The sixth FAQ explicitly explains reset and absence of a real account.

## Evidence and regression status

`node scripts/verify-source.cjs` loads official and modified scripts independently, checks values and matching exported copy, and writes exact before/after values plus a timestamp to `docs/source-checks.json`. Source checks also cover bilingual key parity, preset meeting correspondence, local assets and anchors.

Browser appearance, the displayed pricing dialog and keyboard behavior in the revised page require actual coordinating-agent browser checks. They are not established by this source test. Capture each version only from its actual page and label filenames clearly. Do not put the $15 simulation into official screenshots or the official website delivery ZIP.
