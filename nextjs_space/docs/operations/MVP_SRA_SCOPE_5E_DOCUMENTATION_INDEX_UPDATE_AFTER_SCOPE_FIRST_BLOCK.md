# MVP-SRA-SCOPE-5E - Documentation Index Update after Scope-First Block

## 1. Purpose

Update the MVP-M1 documentation index after the PAES_M1 scope-first documentation block so future chats and agents read the correct canonical chain and do not resume implementation prematurely.

This phase follows `MVP-SRA-SCOPE-5D`, which hardened the current handoff and context transfer template.

This phase is documentation only. It does not change code, runtime, content registry, schema, database, deployment, production, SQL, Prisma CLI, `.env`, secrets, or student data.

## 2. Live baseline

Latest accepted state before this phase:

- HEAD = origin/main = `e5844d7`
- Last accepted commit = `MVP-SRA-SCOPE-5D: refresh context transfer template after scope block`
- Working tree expected = clean

Future agents must still run Git preflight:

```text
git status --short
git log --oneline --decorate --graph -8
```

Git preflight remains the live source of truth if this embedded baseline becomes stale.

## 3. Why this update is required

`DOCUMENTATION_INDEX_MVP_M1.md` previously pointed to an older implementation-oriented phase chain and recommended a runtime continuity edge as next phase.

That is no longer current.

The project state is now:

```text
Construction paused.
Documentation may continue.
Implementation requires explicit restart authorization.
```

The index must match `CURRENT_AGENT_HANDOFF_MVP_M1.md` and `CONTEXT_TRANSFER_TEMPLATE_MVP_M1.md`.

## 4. Required index changes

The updated index must reflect:

- scope-first block from ROADMAP-2H through SCOPE-5E;
- current canonical documents;
- current source/taxonomy/decision docs;
- AS1 available but not universal;
- N1/G1/PE1 proposal-only;
- PE1-MSL-01 candidate only, not implemented;
- expert review prepared but not completed;
- implementation not authorized;
- future metadata-first implementation candidate exists but requires explicit authorization;
- no PAES score, theta, mastery, or adaptive AI claim.

## 5. Next phase after 5E

If continuing documentation-only:

```text
MVP-SRA-SCOPE-5F - Next-chat handoff package after scope-first block
```

If switching chats immediately, generate the next-chat handoff from the updated template.

If implementation is desired later, require explicit authorization before:

```text
MVP-SRA-IMPL-1 - Add provisional taxonomy metadata to current M1 registry activities
```

## 6. Not authorized by this phase

This phase does not authorize:

- implementation;
- registry edits;
- new StudyLoads;
- selector logic;
- continuity map changes;
- UI/API/schema/database changes;
- deploy;
- production;
- tutor-agent behavior;
- external beta expansion;
- PAES score/mastery/theta/adaptive AI claims.

## 7. Handoff requirements

Future handoffs must preserve:

- documentation index updated after scope-first block;
- construction remains paused;
- documentation-only work may continue;
- expert review is prepared but not completed;
- first implementation candidates are provisional and not authorized;
- AS1 is available but not universal;
- PE1-MSL-01 is recommended first non-algebra candidate, not implemented;
- no PAES score, theta, mastery, or adaptive AI claim in MVP-Beta.
