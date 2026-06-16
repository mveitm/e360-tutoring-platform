export function getStudyProgramHref(programCode: string) {
  if (programCode === 'PAES_M1') return '/study/paes-m1'
  if (programCode === 'PAES_M2') return '/study/paes-m2'
  if (programCode === 'PAES_L1') return '/study/paes-l1'
  return '/now#tutorias'
}
