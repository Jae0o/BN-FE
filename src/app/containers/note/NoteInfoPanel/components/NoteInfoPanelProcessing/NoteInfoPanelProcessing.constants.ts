export const PROCESSING_STEPS = ["분석", "요약", "액션", "엔티티"] as const;

export const PROCESSING_STEP_MAP: Record<string, number> = {
  pending: 0,
  processing: 1,
  completed: 4,
  failed: -1,
};

export const PROCESSING_LABEL: Record<string, string> = {
  pending: "대기 중",
  processing: "처리 중",
  completed: "완료",
  failed: "실패",
};
