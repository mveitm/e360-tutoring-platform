# Sales-Ready Phase Proposal Gate

Status: ACTIVE_PHASE_AUTHORIZATION_FIREWALL

## Gate question

Before proposing any next phase, every chat or agent must answer:

> Does this phase directly advance the sales-ready roadmap: student can register, trial, pay, enroll in up to 3 tutorias, work in L1/M1/M2, pause/close/reopen tutorias, and continue without technical manual intervention?

## If YES

The proposal must identify:

* Roadmap block.
* Dependency.
* Expected output.
* Why it is higher priority than alternatives.

## If NO

The proposal must be marked:

```text
LOW_PRIORITY_FOR_SALES_READY
```

It must not be recommended as the next phase.

It may be mentioned only as optional or deferred.

## Useful but outside roadmap

If a phase is useful but not in the roadmap, classify it as:

```text
ROADMAP_CHANGE_REQUEST
```

Do not execute it.

It requires an explicit mutual direction decision from Mauricio and ChatGPT covering:

1. Why the current roadmap is insufficient.
2. What roadmap block changes.
3. What gets deprioritized.
4. Whether docs must be updated first.

## Local, staging, or demo continuation

If a phase continues a local, staging, or demo thread, the default classification is:

```text
LOW_PRIORITY_FOR_SALES_READY
```

Exception: it may proceed only if it clearly unblocks a current roadmap block.

## Required output before any proposed phase

Every proposed next phase must include:

* Roadmap block:
* Sales-ready relevance:
* Dependency:
* What it advances:
* What it does not advance:
* Priority verdict:
* Authorization status:

## Mandatory stop rule

If the chat cannot identify the roadmap block, it must not propose the phase.

Git preflight must still happen first. Then the active context, roadmap, and this gate must be read before proposing work.
