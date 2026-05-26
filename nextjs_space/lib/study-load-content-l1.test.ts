import assert from "node:assert/strict"

import {
  buildStudyLoadFeedback,
  getSafeStudyLoadItems,
  getStudyLoadContentByKey,
  isL1ReadingStudyLoadContent,
} from "./study-load-content"
import { prepareNextStudyLoadAfterCompletion } from "./study-load-continuity"

function test(name: string, fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve(fn()).then(() => {
    console.log(`ok - ${name}`)
  })
}

async function main() {
  const l1Content = getStudyLoadContentByKey("l1_locating_information_pilot_set_01")
  assert.ok(l1Content, "L1 internal artifact must be registered by contentKey")

  await test("L1 artifact preserves authorized internal identity", () => {
    assert.equal(l1Content.contentKey, "l1_locating_information_pilot_set_01")
    assert.equal(l1Content.contentVersion, "internal-v0.1")
    assert.equal(l1Content.contentType, "reading_l1_locating_information")
    assert.equal(l1Content.program, "PAES_L1")
    assert.equal(l1Content.skillFamily, "locating_information")
    assert.equal(l1Content.readingText?.textId, "original_l1_text_locating_information_01_draft")
    assert.equal(l1Content.readingText?.textVersion, "draft-0.1")
    assert.equal(l1Content.approvalMetadata?.studentUseApproved, false)
    assert.equal(l1Content.approvalMetadata?.productUseApproved, false)
    assert.equal(l1Content.approvalMetadata?.salesReadyImplication, "none")
    assert.equal(isL1ReadingStudyLoadContent(l1Content), true)
  })

  await test("L1 safe projection excludes answer keys and authored feedback", () => {
    const safeItems = getSafeStudyLoadItems(l1Content)
    assert.equal(safeItems.length, 3)
    const serialized = JSON.stringify(safeItems)

    assert.equal(serialized.includes("correctOptionKey"), false)
    assert.equal(serialized.includes("authoredFeedback"), false)
    assert.equal(serialized.includes("feedback_breve"), false)
    assert.equal(serialized.includes("feedback_completo"), false)
    assert.equal(serialized.includes("Respuesta correcta"), false)
  })

  await test("L1 authored feedback is available only from submitted feedback construction", () => {
    const feedback = buildStudyLoadFeedback(l1Content, [
      {
        itemKey: "l1_locating_information_item_01",
        selectedOptionKey: "B",
      },
    ])

    const firstItem = feedback.items.find((item) => item.itemKey === "l1_locating_information_item_01")
    const unansweredItem = feedback.items.find((item) => item.itemKey === "l1_locating_information_item_02_revised")

    assert.equal(feedback.answeredCount, 1)
    assert.equal(feedback.totalItemCount, 3)
    assert.equal(feedback.correctCount, 1)
    assert.equal(firstItem?.isCorrect, true)
    assert.equal(firstItem?.authoredFeedbackBriefId, "l1_locating_information_item_01_feedback_breve")
    assert.equal(firstItem?.authoredFeedbackCompleteId, "l1_locating_information_item_01_feedback_completo")
    assert.equal(firstItem?.authoredFeedbackVersion, "reviewed-v0.1")
    assert.ok(firstItem?.authoredFeedbackBrief)
    assert.ok(firstItem?.authoredFeedbackComplete)
    assert.equal(unansweredItem?.authoredFeedbackBrief, undefined)
    assert.equal(unansweredItem?.authoredFeedbackComplete, undefined)
  })

  await test("M1 projection remains passage-free and contentKey compatible", () => {
    const m1Content = getStudyLoadContentByKey("paes_m1_linear_equations_basic")
    assert.ok(m1Content, "M1 fixture content must remain registered")
    assert.equal(m1Content.program, "PAES_M1")
    assert.equal(m1Content.readingText, undefined)
    assert.equal(getSafeStudyLoadItems(m1Content).length, m1Content.items.length)
  })

  await test("L1 continuity is explicit no-continuity and does not create a next load", async () => {
    const outcome = await prepareNextStudyLoadAfterCompletion({
      tx: {} as never,
      completedStudyLoadTitle: l1Content.title,
      learningCycleId: "cycle_internal_fixture",
      programCode: "PAES_L1",
    })

    assert.equal(outcome.status, "explicit_no_continuity")
    if (outcome.status === "explicit_no_continuity") {
      assert.equal(outcome.contentKey, "l1_locating_information_pilot_set_01")
      assert.equal(outcome.programCode, "PAES_L1")
    }
  })

  await test("L1 runtime copy avoids product and readiness claims", () => {
    const joined = [
      l1Content.title,
      l1Content.instructions,
      l1Content.currentLimitationNotice,
      l1Content.topic,
    ].join(" ")

    for (const forbidden of [
      "Sales-Ready",
      "sales ready",
      "producto aprobado",
      "L1 listo",
      "DEMRE",
      "oficial",
      "garant",
      "theta",
      "ranking",
      "dominio completo",
    ]) {
      assert.equal(joined.toLowerCase().includes(forbidden.toLowerCase()), false, forbidden)
    }
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
