# FL-UX-4C — Student Account and Password Protocol

**Version:** 1.0  
**Date:** 2026-05-03  
**Phase:** FL-UX-4C  
**Prerequisite:** FL-UX-4B (internal guided beta operations runbook)  
**Status:** ACTIVE — governs all student account operations during internal beta

---

## 1. Executive Decision

**Internal beta accounts will be handled manually** by the operator,
using private direct communication with each student.

- Public or self-service account creation is **not ready** and must not
  be used.
- No passwords, hashes, tokens, or credentials of any kind may be
  printed in logs, PHASE_LOG, screenshots, prompts, or assistant
  outputs.
- All credential delivery happens through private/direct channels only.

---

## 2. Purpose

This protocol exists to:

1. **Protect student access** — ensure each student can log in and reach
   their assigned content reliably.
2. **Avoid credential leakage** — prevent passwords from appearing in
   documentation, logs, version control, AI prompts, or shared screens.
3. **Make onboarding repeatable** — provide a checklist so every new
   student is set up consistently.
4. **Separate beta from production** — document that these are temporary
   manual procedures, distinct from the future production-grade account
   management system.

---

## 3. Internal Beta Account Scope

| Dimension                   | Constraint                                        |
|-----------------------------|---------------------------------------------------|
| Students                    | 1–3 known individuals, personally invited         |
| Support channel              | Direct (messaging, call, in-person)               |
| Public signup                | **Not available**                                 |
| Institutional onboarding     | **Not available**                                 |
| School/organization accounts | **Not available**                                 |
| Paid cohorts                 | **Not available**                                 |
| Parent/guardian accounts     | **Not available**                                 |

All account operations are 1-to-1 between operator and student.

---

## 4. Account Entities to Verify

Before considering a student account ready, verify all of the following:

| # | Entity / Check                          | Where to verify              |
|---|------------------------------------------|------------------------------|
| 1 | `User` record exists                    | Database / admin panel       |
| 2 | `Student` record exists                 | Admin → Students             |
| 3 | `User.email === Student.email`          | Cross-check both records     |
| 4 | Active enrollment exists                | Admin → Enrollments          |
| 5 | Current learning cycle exists           | Admin → Cycles               |
| 6 | Current pending load exists             | Admin → Study Loads          |
| 7 | Student can reach `/now`                | Test in browser              |

If any check fails, resolve before inviting the student.

---

## 5. Pre-Onboarding Checklist

Complete before sending the student their access instructions:

- [ ] Account created or confirmed (User + Student records).
- [ ] Email address confirmed with the student directly.
- [ ] Student identity confirmed (the person matches the account).
- [ ] Program assigned (PAES_M1 enrollment active).
- [ ] Initial pending load exists in an open cycle.
- [ ] `/now` tested — operator logged in as the student (or verified
      via admin) and confirmed the load is visible.
- [ ] No credentials included in any documentation, log, or prompt.
- [ ] Onboarding message prepared (§8) with credentials to be sent
      privately.

---

## 6. Credential Handling Rules

🔒 **Absolute rules — no exceptions during internal beta:**

1. **Never print passwords** in terminal output, logs, PHASE_LOG,
   documentation, or assistant responses.
2. **Never store passwords** in PHASE_LOG, git commits, markdown files,
   or any version-controlled artifact.
3. **Never paste credentials** into ChatGPT, Abacus AI Agent, Codex, or
   any AI assistant prompt.
4. **Never screenshot credentials** or share screens while credentials
   are visible.
5. **Never send credentials** via public channels, group chats, or
   email threads with multiple recipients.
6. **Use a private/direct channel** (private message, secure call, or
   in-person) for all temporary credential delivery.
7. **Encourage immediate password change** if the platform supports it.
   If not, document this as a known limitation.
8. **Treat all credential exposure** as a security incident requiring
   immediate password reset.

---

## 7. Password Reset Protocol

During internal beta, password resets are **manual only**.

### When to reset
- Student explicitly requests it.
- Operator determines the student cannot log in after troubleshooting.
- A credential exposure incident has occurred.

### How to reset
1. Operator performs the reset through the appropriate mechanism
   (database update, admin tool, or auth API).
2. **Do not document the password value** anywhere.
3. Deliver the new temporary password through a private/direct channel.
4. Document only the operational fact: "Password reset completed for
   [student identifier] on [date]."
5. Verify login after reset — have the student confirm they can access
   `/now`.

### What NOT to do
- Do not reset passwords preemptively without a request or incident.
- Do not reset passwords during an active student session.
- Do not include the password in the PHASE_LOG or any commit message.

---

## 8. Student Onboarding Message Template

Use this template when inviting a student. **Replace placeholders** with
actual values delivered privately.

```
Hola [nombre del estudiante],

Te invitamos a participar en la beta interna de Bexauri, nuestra
plataforma de preparación PAES.

Para acceder:
1. Abre: [URL de producción]
2. Inicia sesión con tu correo: [email]
3. Tu contraseña temporal te será enviada por separado.
4. Una vez dentro, ve a la sección "Ahora" (/now).
5. Presiona "Empezar" para iniciar tu actividad.
6. Presiona "Ver actividad" para ver las preguntas.
7. Responde las preguntas y presiona "Enviar respuestas".
8. Cuando termines, presiona "Terminar" y completa el formulario.

Si tienes problemas para acceder, escríbeme directamente.

Importante: Esta es una versión de prueba. Tu feedback es muy valioso.
```

**⚠️ Never include real credentials in the template.** The password must
be delivered through a separate private message.

---

## 9. Access Verification Flow

After delivering credentials, verify that the student can complete this
flow:

| Step | Action                                      | Expected result                      |
|------|----------------------------------------------|--------------------------------------|
| 1    | Student opens the production URL             | Login page appears                   |
| 2    | Student enters email and password            | Successful login, redirected         |
| 3    | Student navigates to `/now`                  | Current program/cycle visible        |
| 4    | Student sees pending or in-progress load     | Load card with title appears         |
| 5    | Student clicks **Empezar**                   | Load transitions to in-progress      |
| 6    | Student clicks **Ver actividad**             | Activity content renders             |
| 7    | (Optional) Admin checks Beta Ops             | Student's cycle/load state confirmed |

If any step fails, troubleshoot before proceeding. Do not leave the
student with a broken access path.

---

## 10. Lost Access / Login Issue Handling

When a student reports they cannot log in:

```
1. Verify the email address with the student.
2. Verify User record exists in the database.
3. Verify Student record exists.
4. Verify User.email === Student.email.
5. If email mismatch → correct (with explicit approval).
6. If user doesn't exist → escalate (do not create ad-hoc).
7. If all records exist → reset password (§7).
8. Verify login after resolution.
```

**Do NOT create duplicate Student or User records** unless explicitly
approved in a documented future phase. Duplicates create data integrity
risks that are difficult to resolve.

---

## 11. Account Incident Log Guidance

When documenting account-related incidents:

### ✅ Log (non-sensitive operational facts)
- "Student could not access /now; password reset completed privately."
- "Email mismatch between User and Student records; corrected."
- "Student confirmed access after onboarding on [date]."

### 🚫 Never log
- Passwords, password hashes, or temporary credentials.
- Authentication tokens, session cookies, or JWTs.
- Database connection strings or URLs.
- API keys, secrets, or environment variable values.
- Full stack traces containing credential information.

---

## 12. What Is Not Supported Yet

The following are **not available** during internal beta:

| Feature                            | Status          |
|------------------------------------|------------------|
| Public signup                      | Not available   |
| Self-service password reset        | Not verified    |
| Parent/guardian accounts           | Not available   |
| Payment-linked accounts            | Not available   |
| School/institutional onboarding    | Not available   |
| Automated email notifications      | Not available   |
| Role self-management               | Not available   |
| Multi-factor authentication        | Not available   |
| Account deletion by student        | Not available   |
| Profile editing by student         | Not available   |

All of these are potential future-phase requirements.

---

## 13. Future Production-Grade Requirements

When moving beyond internal beta, the following will be needed:

1. **Clean password reset flow** — self-service, email-verified.
2. **Email verification** — on signup and email change.
3. **Invite flow** — operator sends invite link, student creates account.
4. **Parent/guardian account model** — if minors are involved.
5. **Account recovery** — alternative verification methods.
6. **Audit trail** — log all account operations (create, reset, disable)
   without logging credentials.
7. **Privacy/security policy** — documented and user-facing.
8. **Account deactivation** — graceful handling of inactive students.
9. **Data export/portability** — if required by regulation.

---

## 14. Go / No-Go for Inviting a Student

### ✅ GO if all of the following are true:
- Account works (User + Student + enrollment verified).
- `/now` is clear and shows the correct pending load.
- Load title matches a content registry entry (FL-UX-4B §7).
- Operator is available for synchronous support.
- Credentials have been prepared for private delivery.
- Pre-onboarding checklist (§5) is complete.

### 🚫 NO-GO if any of the following are true:
- Login is uncertain or untested.
- Credentials have been exposed in docs, logs, or shared channels.
- `/now` is blank, shows wrong content, or errors.
- No pending load exists.
- Operator is unavailable for the student's first session.

---

## 15. Relation to FL-UX-4B Runbook

This protocol and the FL-UX-4B runbook are complementary:

| Document    | Covers                                              |
|-------------|------------------------------------------------------|
| FL-UX-4B    | Operating the learning beta (cycles, loads, decisions, evidence, reporting) |
| FL-UX-4C    | Safe student account access (creation, credentials, resets, verification)   |

**Use both together.** FL-UX-4C §5 (pre-onboarding) should be completed
before FL-UX-4B §6 (pre-invitation checklist).

---

## 16. Final Recommendation

**Use manual, private, controlled account support for 1–3 students.**

- Do not open public onboarding.
- Do not automate account creation during internal beta.
- Do not store or print credentials in any shared artifact.
- Treat every credential delivery as a private, logged (non-sensitive)
  operation.

### Next likely blocks

| Block                                  | Impact                                       |
|----------------------------------------|----------------------------------------------|
| Content registry limited to 2 loads    | Students exhaust content after 2 cycles      |
| Beta Ops visibility gaps               | Operator may miss state transitions          |
| No self-service password reset         | Every reset requires manual operator action  |
| No email verification flow             | Cannot confirm email ownership automatically |

### Recommended next phase

**FL-UX-4D — Content Registry Expansion** or **FL-UX-4E — Beta Ops
Visibility Hardening**, depending on whether content exhaustion or
operational monitoring is the more pressing concern.

---

*End of FL-UX-4C Student Account and Password Protocol.*
