/**
 * IOP 존 게이지 — OPTO-M 시그니처 컴포넌트
 * 안압 구간(저압 <10 / 정상 10~21 / 주의 22~27 / 위험 >27)을
 * 색상 밴드로 표시하고, 현재 수치를 마커로 나타냅니다.
 */
const MIN = 5;
const MAX = 40;

const ZONES = [
  { from: 5, to: 10, color: '#c9d6e2', label: '저' },
  { from: 10, to: 21, color: '#0c8b99', label: '정상' },
  { from: 21, to: 27, color: '#e8b45a', label: '주의' },
  { from: 27, to: 40, color: '#e0736c', label: '위험' },
];

export function iopStatus(value) {
  if (!value || value <= 0) return { text: '—', color: '#90a0b0', soft: '#eef2f6' };
  if (value < 10) return { text: '낮음', color: '#55677a', soft: '#eef2f6' };
  if (value <= 21) return { text: '정상', color: '#0c8b99', soft: '#e1f3f5' };
  if (value <= 27) return { text: '주의', color: '#c07a08', soft: '#fbf1de' };
  return { text: '위험', color: '#d9463e', soft: '#fbe7e5' };
}

export function IopGauge({ value = 0, height = 8, showTicks = true }) {
  const clamped = Math.min(Math.max(value, MIN), MAX);
  const pos = ((clamped - MIN) / (MAX - MIN)) * 100;
  const hasValue = value > 0;

  return (
    <div className="w-full select-none">
      <div className="relative w-full rounded-full overflow-hidden flex" style={{ height }}>
        {ZONES.map((z) => (
          <div
            key={z.label}
            style={{
              width: `${((z.to - z.from) / (MAX - MIN)) * 100}%`,
              background: z.color,
              opacity: z.label === '정상' ? 1 : 0.45,
            }}
          />
        ))}
      </div>

      {/* 현재 값 마커 */}
      {hasValue && (
        <div className="relative h-0">
          <div
            className="absolute -top-[13px] w-[18px] h-[18px] rounded-full bg-white border-[3px] shadow-md transition-all duration-500"
            style={{
              left: `calc(${pos}% - 9px)`,
              borderColor: iopStatus(value).color,
            }}
          />
        </div>
      )}

      {showTicks && (
        <div className="flex justify-between mt-2 text-[9px] font-semibold text-ink-3 num">
          <span>5</span>
          <span className="text-teal font-bold">10 — 정상 — 21</span>
          <span>27</span>
          <span>40</span>
        </div>
      )}
    </div>
  );
}
