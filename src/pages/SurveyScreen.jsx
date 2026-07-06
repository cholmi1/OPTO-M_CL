import React, { useState } from 'react'
import { ChevronLeft, Info, HelpCircle, Heart } from 'lucide-react'

// 12개 문진 데이터 정의
const SURVEY_QUESTIONS = [
  {
    id: 'q1',
    title: 'Q1. 수면 자세 · 머리 높이',
    cycle: '월 1회',
    priority: 1,
    evidence: '수면 중 평와위(바로 누운 자세)는 야간 안압을 최대 6 mmHg까지 상승시킬 수 있고, 침대 머리를 20~30° 올린 자세에서 야간 IOP가 평균 약 20%(약 1.5~2.0 mmHg) 감소한다는 보고가 있습니다. 옆으로 누운 자세에서는 아래쪽 눈의 안압이 더 높아질 수 있고, 엎드린 자세에서 가장 큰 안압 상승이 관찰됩니다.',
    subQuestions: [
      {
        id: 'q1_1',
        label: 'Q1-1. 평소 주무실 때 어떤 자세로 가장 오래 주무십니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 침대 머리를 20~30° 올리고 잡니다', risk: '저', feedback: '잘하고 계십니다. 침대 머리를 20~30° 올린 자세는 야간 안압을 약 1.5~2.0 mmHg 낮추는 효과가 보고됩니다. 현재 자세를 유지해 주세요.' },
          { value: '2', text: '② 평평하게 바로 누워 잡니다', risk: '중', feedback: '바로 누운 자세는 야간 안압을 최대 6 mmHg까지 높일 수 있습니다. 침대 헤드를 20~30° 올리거나 경사형 베개(웨지 베개)를 사용해 보세요. 일반 베개를 여러 개 겹치는 것은 효과가 제한적일 수 있습니다.' },
          { value: '3', text: '③ 주로 옆으로 누워 잡니다', risk: '중', feedback: '옆으로 자는 자세는 아래쪽 눈의 안압이 더 높아질 수 있습니다. 가능하면 침대 머리를 20~30° 올려 함께 사용하시고, 다음 진료 때 의료진과 상의해 보세요.' },
          { value: '4', text: '④ 엎드려 잡니다', risk: '고', feedback: '엎드린 자세는 안압을 가장 많이 올리는 자세입니다. 가능하면 옆으로 누운 자세로 바꾸시고, 침대 머리를 올리는 방법도 함께 시도해 보세요. 다음 진료 때 의료진과 자세 교정을 상의하시기를 권장합니다.' }
        ]
      },
      {
        id: 'q1_2',
        label: 'Q1-2. 수면 시 머리를 올리는 방식은?',
        type: 'single',
        options: [
          { value: '1', text: '① 침대 헤드 자체를 올림 (전동 침대, 블록 받침 등)', risk: '저', feedback: '가장 권장되는 방식입니다. 머리부터 상체까지 자연스러운 경사가 만들어져 야간 안압 감소 효과가 가장 큽니다.' },
          { value: '2', text: '② 경사형 웨지 베개 사용', risk: '저', feedback: '좋은 방법입니다. 일반 베개보다 상체 경사가 안정적으로 유지됩니다.' },
          { value: '3', text: '③ 일반 베개를 여러 개 겹쳐 사용', risk: '중', feedback: '여러 베개를 겹치는 방식은 자는 도중 자세가 흐트러질 수 있어 효과가 제한적입니다. 침대 헤드를 올리거나 웨지 베개를 사용하는 방법을 권장합니다.' },
          { value: '4', text: '④ 머리를 별도로 올리지 않음', risk: '고', feedback: '야간 안압 관리에 도움이 되도록, 가능한 방법으로 머리를 20~30° 올리는 것을 권장합니다.' }
        ]
      }
    ]
  },
  {
    id: 'q2',
    title: 'Q2. 수면무호흡 의심 증상 · 진단 · CPAP',
    cycle: '초기 1회 + 분기 1회',
    priority: 2,
    evidence: '폐쇄성 수면무호흡증(OSA) 환자에서 녹내장 발생 위험이 약 65% 증가하며, 중증 OSA는 시신경 섬유막(RNFL) 진행 위험 증가와 연관됩니다. CPAP 치료 후 녹내장 진행 완화 가능성도 제시됩니다.',
    subQuestions: [
      {
        id: 'q2_1',
        label: 'Q2-1. 수면무호흡증을 진단받은 적이 있습니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 진단받은 적 없음', risk: '-', feedback: 'Q2-2의 증상이 있다면 수면 전문의 상담을 고려해 보세요.' },
          { value: '2', text: '② 진단받았으나 치료하지 않음', risk: '고', feedback: '수면무호흡증이 있으신 분은 녹내장 발생·진행 위험이 정상인 대비 약 65% 높다는 연구가 있습니다. CPAP 등 치료를 시작하면 녹내장 진행 완화 가능성도 보고됩니다. 수면 전문의와 치료 재개를 상의해 보세요.' },
          { value: '3', text: '③ 진단받았고 CPAP을 사용 중', risk: '중', feedback: 'CPAP을 꾸준히 사용해 주세요. 사용 빈도가 떨어지면 야간 저산소·안압 변동이 다시 나타날 수 있습니다.' },
          { value: '4', text: '④ 진단받았으나 CPAP 사용을 중단함', risk: '고', feedback: 'CPAP 중단 후 OSA 증상이 다시 나타날 수 있고 이는 녹내장 진행과도 연관됩니다. 다음 진료 때 의료진과 재개 여부를 상의해 보세요.' }
        ]
      },
      {
        id: 'q2_2',
        label: 'Q2-2. 최근 1개월간 다음 증상 중 해당하는 것을 모두 선택해 주세요.',
        type: 'multiple',
        options: [
          { value: '1', text: '① 가족이 지적할 정도의 심한 코골이', risk: '중' },
          { value: '2', text: '② 자다가 숨이 멎는 모습을 가족이 목격함', risk: '고' },
          { value: '3', text: '③ 아침에 일어났을 때 두통이 자주 있음', risk: '중' },
          { value: '4', text: '④ 낮 동안 참기 어려운 심한 졸음', risk: '중' },
          { value: '5', text: '⑤ 위 증상 모두 없음', risk: '저' }
        ]
      }
    ]
  },
  {
    id: 'q3',
    title: 'Q3. 혈압약 복용 시점',
    cycle: '초기 1회 + 변경 시 갱신',
    priority: 3,
    evidence: '정상안압녹내장(NTG) 환자에서 야간 혈압 과도 저하는 시신경 관류 저하 및 녹내장 진행과 관련이 깊습니다. 특히 취침 전 혈압약 복용은 야간 저혈압을 유발해 NTG 환자에서 시신경 관류압을 떨어뜨립니다.',
    subQuestions: [
      {
        id: 'q3_1',
        label: 'Q3-1. 현재 혈압약을 복용하십니까? 복용 시점을 선택해 주세요.',
        type: 'single',
        options: [
          { value: '1', text: '① 혈압약을 복용하지 않음', risk: '-', feedback: '현재 복용 중인 혈압약이 없으십니다. 가정 혈압 기록을 정기적으로 측정해 주세요.' },
          { value: '2', text: '② 아침에만 복용', risk: '저', feedback: '아침 복용은 일반적으로 야간 저혈압 위험이 낮습니다. 현재 복용 시점을 유지해 주세요.' },
          { value: '3', text: '③ 아침·저녁 분복', risk: '중', feedback: '저녁 복용 후 야간 혈압이 과도하게 떨어질 가능성이 있습니다. 정상안압녹내장이 있으신 경우 의료진과 복용 시점을 상의해 보세요.' },
          { value: '4', text: '④ 취침 전 복용', risk: '고', feedback: '취침 전 혈압약 복용은 야간 저혈압을 유발해 시신경 관류를 떨어뜨릴 수 있습니다. 다음 진료 때 의료진(안과·내과)과 복용 시점 조정을 상의하시기를 권장합니다.' },
          { value: '5', text: '⑤ 복용 시간이 불규칙', risk: '고', feedback: '복용 시점이 일정하지 않으면 야간 혈압 변동이 커질 수 있습니다. 일정한 시간에 복용하시고, 의료진과 시점을 상의해 보세요.' }
        ]
      },
      {
        id: 'q3_2',
        label: 'Q3-2. 평소 다음 증상이 있습니까? (참고용)',
        type: 'multiple',
        options: [
          { value: '1', text: '① 일어설 때 어지럼증', risk: '중' },
          { value: '2', text: '② 기립성 저혈압 진단 이력', risk: '중' },
          { value: '3', text: '③ 손발이 자주 차가움', risk: '중' },
          { value: '4', text: '④ 위 증상 없음', risk: '저' }
        ]
      }
    ]
  },
  {
    id: 'q4',
    title: 'Q4. 동반 질환 (당뇨 · 고혈압 관리 상태)',
    cycle: '초기 1회 + 분기 1회',
    priority: 4,
    evidence: '당뇨와 고혈압은 시신경 관류와 미세혈관 건강에 영향을 주는 혈관성 위험 요인입니다. 특히 HbA1c 8% 이상의 당뇨와 2단계 이상 고혈압은 추가 관찰이 필수적입니다.',
    subQuestions: [
      {
        id: 'q4_1',
        label: 'Q4-1. 당뇨 진단을 받으셨습니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 없음', risk: '저', feedback: '현재 당뇨 진단 이력이 없습니다.' },
          { value: '2', text: '② 공복혈당 장애 (당뇨 전단계)', risk: '중', feedback: '당뇨 전단계는 미세혈관 건강에 영향을 줄 수 있습니다. 식이·운동 관리를 함께 해주세요.' },
          { value: '3', text: '③ 제2형 당뇨', risk: '중', feedback: '당뇨 관리 상태가 시신경 건강에도 영향을 줄 수 있습니다. HbA1c를 7% 이하로 유지하는 것이 권장됩니다.' },
          { value: '4', text: '④ 제1형 당뇨', risk: '중', feedback: '당뇨 관리 상태가 시신경 건강에도 영향을 줄 수 있습니다. 인슐린 치료 및 정기 조정을 유지해 주세요.' }
        ]
      },
      {
        id: 'q4_2',
        label: 'Q4-2. 최근 HbA1c(당화혈색소) 수치를 아십니까? (당뇨 환자용)',
        type: 'single',
        dependsOn: { q4_1: ['2', '3', '4'] },
        options: [
          { value: '1', text: '① 7% 미만 (조절 양호)', risk: '저', feedback: '혈당 조절이 잘 되고 있습니다. 현재 관리 상태를 유지해 주세요.' },
          { value: '2', text: '② 7~8% (조절 보통)', risk: '중', feedback: '내과 주치의와 혈당 조절 강화를 상의해 보세요.' },
          { value: '3', text: '③ 8% 이상 (조절 불량)', risk: '고', feedback: '조절되지 않는 고혈당은 시신경을 포함한 미세혈관 건강에 악영향을 줄 수 있습니다. 내과 주치의와 적극적인 혈당 관리를 상의해 주세요.' },
          { value: '4', text: '④ 모름', risk: '-', feedback: '다음 내과 진료 때 HbA1c 수치를 확인해 보세요.' }
        ]
      },
      {
        id: 'q4_3',
        label: 'Q4-3. 고혈압 진단을 받으셨습니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 없음 (120/80 미만)', risk: '저', feedback: '혈압이 정상 범위입니다.' },
          { value: '2', text: '② 전고혈압 (120~139 / 80~89)', risk: '저', feedback: '혈압 관리를 위해 식이·운동·체중 관리를 권장합니다.' },
          { value: '3', text: '③ 고혈압 1단계 (140~159 / 90~99)', risk: '중', feedback: '고혈압 1단계입니다. 야간 혈압 패턴이 녹내장에 영향을 줄 수 있으므로 의료진과 약 복용 시점을 함께 상의해 보세요.' },
          { value: '4', text: '④ 고혈압 2단계 (160 이상 / 100 이상)', risk: '고', feedback: '고혈압 2단계는 적극적인 관리가 필요합니다. 내과 주치의와 즉시 상의하시고, 안과 진료 시에도 알려 주세요.' }
        ]
      }
    ]
  },
  {
    id: 'q5',
    title: 'Q5. 안압 급상승 유발 행동',
    cycle: '분기 1회',
    priority: 5,
    evidence: '역전 요가 자세나 발살바 호흡을 동반한 고중량 웨이트는 안압을 일시적으로 대폭 상승시킵니다. 꽉 끼는 물안경, 목을 죄는 넥타이, 세게 눈 비비기 등도 안압의 급격한 일시 상승을 유발하여 회피 교육이 필요합니다.',
    subQuestions: [
      {
        id: 'q5_1',
        label: 'Q5-1. 다음 중 평소 자주 하시는 것을 모두 선택해 주세요.',
        type: 'multiple',
        options: [
          { value: '1', text: '① 머리가 심장보다 아래로 가는 요가/스트레칭 (물구나무, 다운독 등)', risk: '고', feedback: '역전 자세는 자세 유지 중 안압을 급격히 높입니다. 명상 호흡(복식호흡·교호 비호흡)이나 일반 자세 요가로 대체하시기를 권장합니다.' },
          { value: '2', text: '② 숨을 참으며 무거운 중량을 드는 고강도 근력 운동', risk: '고', feedback: '발살바 호흡(숨 참기)은 안압을 최대 4 mmHg까지 일시적으로 높입니다. 호흡을 내쉬면서 동작을 수행하고, 극단적인 고중량보다는 중등 중량 고반복 방식으로 바꿔 보세요.' },
          { value: '3', text: '③ 꽉 끼는 수영 고글을 자주 착용', risk: '중', feedback: '작은 수영 고글의 안와 압박은 안압을 일시적으로 높일 수 있습니다. 압박이 덜한 큰 사이즈 고글이나 마스크형 고글을 권장합니다.' },
          { value: '4', text: '④ 목을 조이는 넥타이·칼라를 오래 착용', risk: '중', feedback: '목 조임은 경정맥 압력을 높여 안압을 올릴 수 있습니다. 넥타이를 느슨하게 매시고 셔츠 사이즈를 확인해 보세요.' },
          { value: '5', text: '⑤ 눈을 자주 비비거나 세게 누름', risk: '중', feedback: '눈을 비비거나 누르는 동작은 일시적으로 안압을 크게 높입니다. 가려움·건조감이 있으시면 안과 처방 인공눈물을 사용해 보세요.' },
          { value: '6', text: '⑥ 트럼펫·호른 등 고압 관악기 연주', risk: '중', feedback: '고압 관악기 연주는 발살바 호흡과 유사한 안압 상승을 유발할 수 있습니다. 연주 후 안압 변동이 있는지 정기 점검해 주세요.' },
          { value: '7', text: '⑦ 단시간에 물 1L 이상을 급하게 마시는 습관', risk: '중', feedback: '짧은 시간에 많은 물(1L 이상)을 마시면 일시적으로 안압이 오를 수 있고, 녹내장 환자에서 그 폭이 더 큽니다(water-drinking test 원리). 물은 한 번에 몰아 마시지 말고 나눠서 천천히 드세요.' },
          { value: '8', text: '⑧ 위 항목 모두 해당 없음', risk: '저', feedback: '안압 상승 위험 행동이 적은 편입니다. 현재 생활 패턴을 유지해 주세요.' }
        ]
      }
    ]
  },
  {
    id: 'q6',
    title: 'Q6. 흡연 상태 · 강도 · 금연 기간',
    cycle: '초기 1회 + 분기 1회',
    priority: 6,
    evidence: '흡연 강도와 시야 진행 속도는 깊은 연관이 있습니다. 특히 20 pack-year 이상의 중증 흡연력은 급격한 시야 진행 악화를 초래하므로 장기 금연을 통한 위험 완화가 중요합니다.',
    subQuestions: [
      {
        id: 'q6_1',
        label: 'Q6-1. 흡연 상태는?',
        type: 'single',
        options: [
          { value: '1', text: '① 비흡연 (평생 100개비 미만)', risk: '저', feedback: '현재 비흡연 상태입니다. 잘 유지해 주세요.' },
          { value: '2', text: '② 과거 흡연 (현재 금연)', risk: '중', feedback: '금연을 잘 유지하고 계십니다. 장기 금연은 시야 진행 위험을 낮추는 데 도움이 됩니다.' },
          { value: '3', text: '③ 현재 흡연 중', risk: '고', feedback: '흡연, 특히 누적 흡연량 20 pack-year 이상은 시야 악화 속도와 관련됩니다. 금연을 강력히 권장드리며, 가까운 보건소 금연 클리닉이나 1544-9030(금연상담전화)을 이용하실 수 있습니다.' }
        ]
      },
      {
        id: 'q6_2',
        label: 'Q6-2. 일평균 흡연량과 흡연 기간 (현재/과거 흡연자 전용)',
        type: 'numeric_packyear',
        dependsOn: { q6_1: ['2', '3'] }
      },
      {
        id: 'q6_3',
        label: 'Q6-3. 금연 후 경과 기간 (과거 흡연자 전용)',
        type: 'single',
        dependsOn: { q6_1: ['2'] },
        options: [
          { value: '1', text: '① 1년 미만', risk: '중', feedback: '금연 초기입니다. 1년 이상 지속하면 위험 감소가 본격적으로 나타날 수 있습니다.' },
          { value: '2', text: '② 1~5년', risk: '중', feedback: '금연을 잘 유지하고 계십니다. 5년 이상 지속하면 추가 위험 감소가 기대됩니다.' },
          { value: '3', text: '③ 5~10년', risk: '저', feedback: '장기 금연을 잘 유지하고 계십니다.' },
          { value: '4', text: '④ 10년 이상', risk: '저', feedback: '10년 이상 장기 금연은 비흡연자에 가까운 위험 수준으로 보고됩니다.' }
        ]
      }
    ]
  },
  {
    id: 'q7',
    title: 'Q7. 카페인 섭취',
    cycle: '주 1회',
    priority: 7,
    evidence: '고안압증 및 녹내장 환자는 카페인 다량 섭취 시 안압이 유의미하게 상승하며, 유산소 운동의 안압 강하 효과를 상쇄합니다. 하루 5잔 이상의 고용량 섭취는 피해야 합니다.',
    subQuestions: [
      {
        id: 'q7_1',
        label: 'Q7-1. 하루 카페인 음료(커피·에너지음료·진한 차) 섭취량은?',
        type: 'single',
        options: [
          { value: '1', text: '① 마시지 않음', risk: '저', feedback: '카페인 섭취가 없으십니다.' },
          { value: '2', text: '② 1~2잔', risk: '저', feedback: '적정 범위의 섭취량입니다. 안압이 잘 조절되고 있다면 현재 수준을 유지하셔도 됩니다.' },
          { value: '3', text: '③ 3~4잔', risk: '중', feedback: '녹내장 환자에서 카페인 섭취 후 안압이 일시 상승할 수 있습니다. 가능하면 2잔 이내로 줄이거나, 일부를 디카페인으로 대체해 보세요.' },
          { value: '4', text: '④ 5잔 이상', risk: '고', feedback: '하루 5잔 이상의 카페인은 녹내장 위험을 약 1.6배 높인다는 연구가 있습니다. 섭취량을 줄이거나 디카페인으로 점진적으로 교체하시기를 권장합니다.' }
        ]
      },
      {
        id: 'q7_2',
        label: 'Q7-2. 한 번에 진한 커피(에스프레소, 더블샷 등)를 자주 드십니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 거의 없음', risk: '저', feedback: '진한 카페인 섭취 우려가 적습니다.' },
          { value: '2', text: '② 가끔', risk: '중', feedback: '한 번에 진한 농도로 마시면 안압이 일시적으로 더 크게 상승할 수 있습니다. 가능하면 농도를 낮추거나 여러 번에 나누어 드세요.' },
          { value: '3', text: '③ 자주', risk: '고', feedback: '한 번에 진한 카페인 섭취는 안압 변동을 키울 수 있습니다. 농도를 낮추거나 디카페인으로 일부를 대체하시기를 권장합니다.' }
        ]
      }
    ]
  },
  {
    id: 'q8',
    title: 'Q8. 식이 (녹색 잎채소 · 질산염)',
    cycle: '주 1회',
    priority: 8,
    evidence: '질산염이 풍부한 녹색 잎채소 섭취는 원발개방각녹내장(POAG) 발생 위험을 20~30% 낮추며 시야 결손 진행 위험을 최대 44% 낮춘다는 연구가 있습니다. 산화질소 매개로 시신경 관류압을 안정화합니다.',
    subQuestions: [
      {
        id: 'q8_1',
        label: 'Q8-1. 시금치·케일·상추·쑥갓 등 녹색 잎채소를 얼마나 자주 드십니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 매일 1접시 이상', risk: '저', feedback: '잘하고 계십니다. 녹색 잎채소를 매일 섭취하시면 질산염 매개 시신경 보호 효과가 기대됩니다.' },
          { value: '2', text: '② 주 3~5회', risk: '저', feedback: '충분한 섭취 빈도입니다. 가능하면 매일 섭취로 늘려 보세요.' },
          { value: '3', text: '③ 주 1~2회', risk: '중', feedback: '녹색 잎채소 섭취 빈도가 낮은 편입니다. 매 식사에 시금치·케일·상추 같은 잎채소 한 가지를 추가해 보세요.' },
          { value: '4', text: '④ 거의 먹지 않음', risk: '고', feedback: '질산염이 풍부한 녹색 잎채소를 충분히 드시면 녹내장 위험이 최대 44% 낮아질 수 있다는 연구 결과가 있습니다. 하루 1.5컵(약 주 10접시) 이상을 목표로 단계적으로 늘려 보세요.' }
        ]
      },
      {
        id: 'q8_2',
        label: 'Q8-2. 평소 식단을 가장 잘 설명하는 항목은?',
        type: 'single',
        options: [
          { value: '1', text: '① 채소·과일·생선·올리브오일 위주 (지중해식/MIND 식단)', risk: '저', feedback: '녹내장 발생 위험 감소와 연관된 식단 패턴입니다. 현재 식단을 유지해 주세요.' },
          { value: '2', text: '② 일반적 한식 (채소 반찬, 생선, 잡곡)', risk: '저', feedback: '균형 잡힌 식단입니다. 녹색 잎채소 비중을 조금 더 늘려 보세요.' },
          { value: '3', text: '③ 육류 · 정제 탄수화물 위주', risk: '중', feedback: '채소·생선·견과류 비중을 늘리시면 시신경 보호에 도움이 될 수 있습니다.' },
          { value: '4', text: '④ 외식 · 가공식품 위주', risk: '고', feedback: '외식·가공식품 비중이 높으면 채소·질산염 섭취가 부족할 가능성이 큽니다. 하루 한 끼라도 채소 위주 식사로 바꿔 보세요.' }
        ]
      }
    ]
  },
  {
    id: 'q9',
    title: 'Q9. 유산소 운동 습관',
    cycle: '주 1회',
    priority: 9,
    evidence: '적당한 강도의 유산소 운동은 방수 유출을 활성화해 안압을 약 2~5 mmHg 낮추고 시야 결손 진행 속도를 지연시킵니다. 스마트워치 연동 시 수집된 데이터가 자동으로 반영될 수 있습니다.',
    subQuestions: [
      {
        id: 'q9_1',
        label: 'Q9-1. 일주일에 유산소 운동(빠르게 걷기, 조깅, 수영 등)을 어느 정도 하십니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 주 3회 이상, 회당 30분 이상', risk: '저', feedback: '잘하고 계십니다. 주 3회·회당 30분 이상의 유산소 운동은 안압을 낮추고 눈의 혈류를 개선하는 데 도움이 됩니다. 현재 운동 습관을 유지해 주세요.' },
          { value: '2', text: '② 주 1~2회', risk: '중', feedback: '규칙적인 유산소 운동은 안압 관리에 도움이 됩니다. \'약간 숨이 차는\' 강도로 주 3회·회당 30분을 목표로 조금씩 늘려 보세요.' },
          { value: '3', text: '③ 거의 하지 않음 (좌식 생활 위주)', risk: '고', feedback: '신체 활동이 적은 편입니다. 치료 중인 녹내장 환자에서 걸음 수·활동량이 많을수록 시야 진행이 느렸다는 연구가 있습니다. 하루 20~30분 빠르게 걷기부터 시작해 보세요.' },
          { value: '4', text: '④ 운동하고 싶으나 신체 제약으로 어려움', risk: '중', feedback: '무리가 되지 않는 범위에서 가능한 활동(짧은 산책, 실내 자전거 등)을 시도해 보시고, 다음 진료 때 의료진과 적절한 운동 방법을 상의해 보세요.' }
        ]
      },
      {
        id: 'q9_2',
        label: 'Q9-2. 운동하실 때 강도는 어느 정도입니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 숨이 약간 차고 땀이 나는 정도 (중강도 이상)', risk: '저', feedback: '중강도 이상의 유산소 운동은 안압 강하·혈류 개선 효과가 더 큽니다. 좋은 강도입니다.' },
          { value: '2', text: '② 가볍게 걷는 정도 (저강도)', risk: '중', feedback: '가벼운 활동도 도움이 되지만, 가능하면 \'약간 숨이 차는\' 중강도까지 올리시면 효과가 더 큽니다.' },
          { value: '3', text: '③ 운동 중 숨을 참거나 힘을 주는 발살바 동작이 많음', risk: '중', feedback: '숨을 참는 동작(발살바)은 오히려 안압을 일시적으로 높일 수 있습니다. 동작 중 숨을 내쉬며 수행하시고, Q5(안압 급상승 유발 행동)도 함께 확인해 주세요.' }
        ]
      }
    ]
  },
  {
    id: 'q10',
    title: 'Q10. 수면 시간 · 수면의 질',
    cycle: '월 1회',
    priority: 10,
    evidence: '수면이 비정상적으로 짧거나 긴 경우, 혹은 불면의 질 저하는 야간 안압 변동 폭을 크게 하고 시신경 혈류 악화로 이어집니다. 하루 7시간 내외가 최적의 수면 패턴입니다.',
    subQuestions: [
      {
        id: 'q10_1',
        label: 'Q10-1. 평소 하루 수면 시간은 어느 정도입니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 6시간 미만 (부족)', risk: '중', feedback: '수면이 부족하면 녹내장 위험이 다소 높아진다는 연구가 있습니다. 하루 약 7시간을 목표로 취침·기상 시간을 규칙적으로 맞춰 보세요.' },
          { value: '2', text: '② 6~9시간 (적정)', risk: '저', feedback: '적정 수면 시간입니다. 하루 약 7시간 전후가 최적으로 보고됩니다. 현재 수면 습관을 유지해 주세요.' },
          { value: '3', text: '③ 9시간 초과 (과다)', risk: '중', feedback: '수면 시간이 지나치게 길어도 녹내장 위험이 다소 높아진다는 보고가 있습니다. 피로·우울·수면의 질 저하 등 배경 요인이 있는지 살펴보시고, 지속되면 의료진과 상의해 보세요.' },
          { value: '4', text: '④ 일정하지 않음 (교대근무 등)', risk: '중', feedback: '수면 시간이 불규칙하면 안압·혈압의 하루 주기 리듬이 흐트러질 수 있습니다. 가능한 범위에서 취침·기상 시간을 일정하게 유지해 보세요.' }
        ]
      },
      {
        id: 'q10_2',
        label: 'Q10-2. 최근 1개월간 수면의 질은 어떠십니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 잘 자고 개운함', risk: '저', feedback: '수면의 질이 양호합니다. 현재 상태를 유지해 주세요.' },
          { value: '2', text: '② 잠들기 어렵거나 자주 깸 (경도)', risk: '중', feedback: '입면 곤란·잦은 각성은 불면 경향을 시사합니다. 취침 전 카페인·스마트폰 사용을 줄이고 규칙적인 수면 습관을 시도해 보세요.' },
          { value: '3', text: '③ 거의 매일 불면으로 힘들', risk: '고', feedback: '지속적인 불면은 녹내장 위험 증가와 연관된다는 연구가 있습니다. 수면 위생 개선으로 나아지지 않으면 의료진(수면 클리닉 등) 상담을 권장합니다.' },
          { value: '4', text: '④ 수면제를 복용해야 잠듦', risk: '중', feedback: '수면제를 정기적으로 복용 중이시면 다음 진료 때 의료진에게 알려 주세요. 일부 약물은 전신 상태에 영향을 줄 수 있습니다.' }
        ]
      }
    ]
  },
  {
    id: 'q11',
    title: 'Q11. 부정맥 · 심방세동 진단 여부',
    cycle: '초기 1회 + 변경 시 갱신',
    priority: 11,
    evidence: '심방세동(AF) 등 부정맥은 혈관성 관류 저하 및 야간 산소포화도 불균형을 통해 정상안압녹내장 발생 위험을 1.3배 높입니다. 스마트워치에서 불규칙 맥박이 감지되는 경우 모니터링이 필요합니다.',
    subQuestions: [
      {
        id: 'q11_1',
        label: 'Q11-1. 부정맥 또는 심방세동을 진단받은 적이 있습니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 진단받은 적 없음', risk: '저', feedback: '부정맥·심방세동 진단 이력이 없습니다.' },
          { value: '2', text: '② 심방세동(AF) 진단받음', risk: '중', feedback: '심방세동은 혈관성 경로로 녹내장 위험을 다소 높일 수 있다는 연구가 있습니다(특히 정상안압녹내장). 안과 진료 시 이 내용을 알려 주시고, 정기 안압·시야 검사를 유지해 주세요.' },
          { value: '3', text: '③ 기타 부정맥 진단받음', risk: '중', feedback: '부정맥이 있으신 경우 안과 진료 시 함께 말씀해 주세요. 심장내과 관리 상태를 잘 유지하는 것이 도움이 됩니다.' },
          { value: '4', text: '④ 진단받은 적은 없으나 맥박이 불규칙하다고 느꼈거나 워치에서 불규칙 맥박이 감지됨', risk: '중', feedback: '불규칙한 맥박을 느끼신 적이 있다면 심장내과에서 심전도(ECG) 확인을 받아 보시기를 권장합니다. 확인되지 않은 부정맥이 있을 수 있습니다.' }
        ]
      }
    ]
  },
  {
    id: 'q12',
    title: 'Q12. 음주',
    cycle: '주 1회',
    priority: 12,
    evidence: '습관적이고 과도한 음주는 일관되게 안압을 상승시킵니다. 특히 주 4회 이상 또는 1회 다량 음주는 일시적인 안압의 급격한 연쇄 변동을 초래하므로 절주가 필수적입니다.',
    subQuestions: [
      {
        id: 'q12_1',
        label: 'Q12-1. 지난 1주일 동안 음주 빈도는 어느 정도였습니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 음주 안 함', risk: '저', feedback: '음주를 하지 않으십니다. 안압 관리에 유리한 습관입니다.' },
          { value: '2', text: '② 주 1회 이하', risk: '저', feedback: '음주 빈도가 낮습니다. 현재 수준을 유지하시고 한 번에 많이 마시지 않도록 유의해 주세요.' },
          { value: '3', text: '③ 주 2~3회', risk: '중', feedback: '잦은 음주는 안압을 다소 높일 수 있다는 연구가 있습니다. 빈도와 1회 섭취량을 줄여 보시길 권합니다.' },
          { value: '4', text: '④ 주 4회 이상', risk: '고', feedback: '잦은 음주는 안압 상승과 연관됩니다(특히 녹내장 위험이 높은 경우). 절주를 권하며, 다음 진료 때 음주 습관을 의료진과 상의해 보세요.' }
        ]
      },
      {
        id: 'q12_2',
        label: 'Q12-2. 술을 드실 때 1회 섭취량은 어느 정도입니까?',
        type: 'single',
        options: [
          { value: '1', text: '① 1잔 이하', risk: '저', feedback: '소량 음주입니다. 현재 수준을 유지해 주세요.' },
          { value: '2', text: '② 2~3잔', risk: '중', feedback: '1회 섭취량이 다소 많습니다. 총 음주량이 늘수록 안압이 높아진다는 보고가 있으니 양을 줄여 보세요.' },
          { value: '3', text: '④ 4잔 이상', risk: '고', feedback: '1회 다량 음주는 안압 변동과 연관될 수 있습니다. 폭음을 피하고 절주를 권합니다.' }
        ]
      }
    ]
  }
]

export default function SurveyScreen({ onNavigate }) {
  const [expandedSection, setExpandedSection] = useState('q1')
  const [showEvidence, setShowEvidence] = useState({}) // { q1: false, q2: false... }
  const [answers, setAnswers] = useState({}) // { q1_1: '1', q2_2: ['1', '3'] ... }
  const [showResult, setShowResult] = useState(false)

  // Q6-2 수기 입력 데이터 상태
  const [smokeAmount, setSmokeAmount] = useState('')
  const [smokeYears, setSmokeYears] = useState('')

  // Q11 워치 자동 플래그 연동 시뮬레이션 상태
  const [watchIrrPulseDetected, setWatchIrrPulseDetected] = useState(false)

  // 섹션 토글
  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  // 임상근거 토글
  const toggleEvidence = (qId, e) => {
    e.stopPropagation()
    setShowEvidence(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }))
  }

  // 응답 선택 처리 (단일선택)
  const handleSelectSingle = (subQId, value) => {
    setAnswers(prev => ({
      ...prev,
      [subQId]: value
    }))
  }

  // 응답 선택 처리 (복수선택)
  const handleSelectMultiple = (subQId, value) => {
    setAnswers(prev => {
      const current = prev[subQId] || []
      let next
      if (value === '5') { // '위 증상 모두 없음' 선택 시 다른 것 다 해제
        next = ['5']
      } else {
        next = current.filter(v => v !== '5')
        if (next.includes(value)) {
          next = next.filter(v => v !== value)
        } else {
          next = [...next, value]
        }
        if (next.length === 0) next = []
      }
      return {
        ...prev,
        [subQId]: next
      }
    })
  }

  // Q11 스마트워치 가상 연동 트리거
  const handleWatchIrrTrigger = () => {
    setWatchIrrPulseDetected(true)
    // Q11-1에 4번을 자동선택
    setAnswers(prev => ({
      ...prev,
      q11_1: '4'
    }))
    alert('워치에서 불규칙 맥박 알림(IRN) 양성 신호가 연동되었습니다!\n- Q11-1의 ④번이 자동으로 선택되고 상세 가이드가 표시됩니다.')
  }

  // 흡연 계산 메시지 도출 함수
  const getPackYearFeedback = () => {
    const amount = Number(smokeAmount) || 0
    const years = Number(smokeYears) || 0
    if (amount <= 0 || years <= 0) return null

    // Pack-year = (하루 개비수 / 20) * 년수
    const packYear = (amount / 20) * years
    let text = ''
    let risk = '저'
    if (packYear < 10) {
      risk = '저'
      text = `누적 흡연량 ${packYear.toFixed(1)} pack-year로 비교적 낮은 편이나, 금연이 시야 보호에 장기적으로 도움이 됩니다.`
    } else if (packYear >= 10 && packYear < 20) {
      risk = '중'
      text = `누적 흡연량 ${packYear.toFixed(1)} pack-year로 중등도 누적 흡연량입니다. 금연이 시야 진행 위험을 낮추는 데 도움이 됩니다.`
    } else {
      risk = '고'
      text = `누적 흡연량 ${packYear.toFixed(1)} pack-year로 중증 흡연(20 pack-year 이상)에 해당합니다. 20 pack-year 이상의 누적 흡연량은 녹내장 시야 진행 악화 속도와 매우 밀접하게 관련됩니다. 금연을 강력히 권장드립니다.`
    }

    return { packYear, text, risk }
  }

  const packYearData = getPackYearFeedback()

  return (
    <div className="flex flex-col h-full bg-app-bg text-ink select-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 h-12 bg-surface border-b border-line shrink-0">
        <button 
          onClick={() => onNavigate('cover')} 
          className="flex items-center text-ink-2 hover:text-ink transition-colors cursor-pointer active:scale-95"
        >
          <ChevronLeft size={20} className="-ml-1" strokeWidth={2.5} />
          <span className="text-xs font-bold">홈으로</span>
        </button>
        <h2 className="text-sm font-extrabold text-ink">문진표</h2>
        <div className="w-14"></div>
      </div>

      {/* 리스트 본문 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        
        {/* 설명 상자 */}
        <div className="bg-warn-soft border border-warn/25 rounded-2xl p-3 text-xs text-warn leading-relaxed flex justify-between items-start gap-2 font-medium">
          <span>* 아래 질문에 성실히 답변하시면 안압에 미치는 영향 분석과 맞춤 피드백을 실시간으로 드립니다.</span>
          <button 
            onClick={handleWatchIrrTrigger}
            className="shrink-0 bg-warn hover:opacity-90 text-ink font-bold px-2 py-1 rounded-md text-[9px] active:scale-95 transition-all"
          >
            워치연동테스트
          </button>
        </div>

        {/* 12개 질문 아코디언 */}
        {SURVEY_QUESTIONS.map((q) => {
          const isExpanded = expandedSection === q.id
          const isEvidenceOpen = showEvidence[q.id]
          
          return (
            <div 
              key={q.id}
              className={`bg-surface border rounded-2xl overflow-hidden transition-all duration-300 card-shadow ${
                isExpanded ? 'border-warn' : 'border-line'
              }`}
            >
              {/* 아코디언 헤더 */}
              <div 
                onClick={() => toggleSection(q.id)}
                className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-app-bg transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-ink">{q.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] bg-teal-soft text-teal-deep px-1.5 py-0.5 rounded-md font-bold">
                      {q.cycle}
                    </span>
                    <span className="text-[9px] bg-app-bg text-ink-3 px-1.5 py-0.5 rounded-md font-semibold">
                      우선순위 {q.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => toggleEvidence(q.id, e)}
                    className={`flex items-center justify-center p-1 rounded-lg border transition-all text-[10px] gap-0.5 font-bold ${
                      isEvidenceOpen 
                        ? 'border-warn bg-warn-soft text-warn' 
                        : 'border-line text-ink-3 hover:text-ink'
                    }`}
                  >
                    <Info size={11} />
                    의학근거
                  </button>
                  <span className="text-ink-3 text-xs font-bold ml-1">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* 임상근거 확장 영역 */}
              {isEvidenceOpen && (
                <div className="bg-warn-soft/60 border-t border-b border-line p-3 text-xs leading-relaxed text-ink-2">
                  <p className="font-bold text-warn mb-1">임상적 의학 근거</p>
                  {q.evidence}
                </div>
              )}

              {/* 문항 본문 (확장 시 노출) */}
              {isExpanded && (
                <div className="p-4 space-y-4 border-t border-line bg-app-bg/60">
                  {q.subQuestions.map((subQ) => {
                    // 의존성 필터링
                    if (subQ.dependsOn) {
                      const parentKey = Object.keys(subQ.dependsOn)[0]
                      const allowedValues = subQ.dependsOn[parentKey]
                      const parentAnswer = answers[parentKey]
                      if (!parentAnswer || !allowedValues.includes(parentAnswer)) {
                        return null
                      }
                    }

                    const selectedValue = answers[subQ.id]

                    // 특정 UI 타입 분기
                    if (subQ.type === 'numeric_packyear') {
                      // 흡연 전용 특수 UI
                      return (
                        <div key={subQ.id} className="space-y-2">
                          <label className="text-[12px] font-bold text-ink leading-normal block">
                            {subQ.label}
                          </label>
                          
                          <div className="flex gap-2">
                            <div className="flex-1 bg-surface border border-line rounded-xl p-2">
                              <span className="text-[9px] text-ink-3 font-semibold block">하루 흡연량</span>
                              <div className="flex items-center mt-1">
                                <input 
                                  type="number"
                                  value={smokeAmount}
                                  onChange={e => setSmokeAmount(e.target.value)}
                                  placeholder="개비"
                                  className="w-full bg-transparent text-sm text-ink font-bold outline-none border-none text-center num"
                                />
                                <span className="text-[10px] text-ink-3 font-semibold ml-1">개비/일</span>
                              </div>
                            </div>
                            <div className="flex-1 bg-surface border border-line rounded-xl p-2">
                              <span className="text-[9px] text-ink-3 font-semibold block">흡연 기간</span>
                              <div className="flex items-center mt-1">
                                <input 
                                  type="number"
                                  value={smokeYears}
                                  onChange={e => setSmokeYears(e.target.value)}
                                  placeholder="년"
                                  className="w-full bg-transparent text-sm text-ink font-bold outline-none border-none text-center num"
                                />
                                <span className="text-[10px] text-ink-3 font-semibold ml-1">년</span>
                              </div>
                            </div>
                          </div>

                          {/* 실시간 팩이어(Pack-year) 연산 피드백 */}
                          {packYearData && (
                            <div className="mt-2.5 p-3 rounded-xl bg-warn-soft border border-warn/25 text-xs rise-in">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-extrabold text-[10px] text-warn">Pack-Year 계산 결과</span>
                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                                  packYearData.risk === '고' ? 'bg-high-soft text-high border border-high/30' :
                                  packYearData.risk === '중' ? 'bg-warn-soft text-warn border border-warn/30' :
                                  'bg-ok-soft text-ok border border-ok/30'
                                }`}>
                                  위험도: {packYearData.risk}
                                </span>
                              </div>
                              <p className="text-ink-2 text-[11px] leading-relaxed font-medium">
                                {packYearData.text}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    }

                    return (
                      <div key={subQ.id} className="space-y-2">
                        <label className="text-[12px] font-bold text-ink leading-normal block">
                          {subQ.label}
                        </label>

                        {/* 옵션 버튼 목록 */}
                        <div className="flex flex-col gap-2">
                          {subQ.options.map((opt) => {
                            let isSelected = false
                            if (subQ.type === 'single') {
                              isSelected = selectedValue === opt.value
                            } else if (subQ.type === 'multiple') {
                              isSelected = Array.isArray(selectedValue) && selectedValue.includes(opt.value)
                            }

                            // 위험도 색상 맵핑
                            const riskColors = {
                              '고': 'bg-high-soft text-high border-high/30',
                              '중': 'bg-warn-soft text-warn border-warn/30',
                              '저': 'bg-ok-soft text-ok border-ok/30',
                              '-': 'bg-app-bg text-ink-3 border-transparent'
                            }

                            return (
                              <button
                                key={opt.value}
                                onClick={() => {
                                  if (subQ.type === 'single') {
                                    handleSelectSingle(subQ.id, opt.value)
                                  } else {
                                    handleSelectMultiple(subQ.id, opt.value)
                                  }
                                }}
                                className={`w-full flex items-start p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all duration-200 bg-surface hover:border-warn/50 active:scale-[0.99] ${
                                  isSelected 
                                    ? 'border-warn bg-warn-soft text-ink' 
                                    : 'border-line text-ink-2'
                                }`}
                              >
                                <span className="flex-1 mr-2 leading-tight">{opt.text}</span>
                                {opt.risk !== '-' && (
                                  <span className={`shrink-0 text-[8px] font-black px-1.5 py-0.5 rounded-full border ${riskColors[opt.risk]}`}>
                                    {opt.risk}
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>

                        {/* 실시간 피드백 노출 (단일 선택일 경우) */}
                        {subQ.type === 'single' && selectedValue && (
                          <div className="mt-2 p-3 bg-surface border border-line rounded-xl rise-in card-shadow">
                            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-extrabold text-warn">
                              <HelpCircle size={12} />
                              <span>앱 자동 교육 피드백</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-ink-2 font-medium">
                              {subQ.options.find(o => o.value === selectedValue)?.feedback}
                            </p>
                          </div>
                        )}

                        {/* 복수 선택 통합 피드백 (Q2-2 또는 Q3-2 전용) */}
                        {subQ.type === 'multiple' && Array.isArray(selectedValue) && selectedValue.length > 0 && (
                          <div className="mt-2 p-3 bg-surface border border-line rounded-xl rise-in card-shadow">
                            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-extrabold text-warn">
                              <HelpCircle size={12} />
                              <span>통합 피드백 메시지</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-ink-2 font-medium">
                              {subQ.id === 'q2_2' ? (
                                selectedValue.filter(v => v !== '5').length >= 2 ? (
                                  '코골이·무호흡·아침 두통·낮 졸음은 수면무호흡증의 대표 증상입니다. 수면무호흡증이 있는 분은 녹내장 발생 위험이 최대 65% 높다는 연구 결과가 있습니다. 가까운 수면 클리닉 또는 이비인후과 상담을 권장합니다.'
                                ) : (
                                  '지정하신 증상이 1개 이하로 특별한 경고는 없습니다만, 코골이나 낮 졸음이 만성화되면 의료진과 상의해 보시기를 권장합니다.'
                                )
                              ) : subQ.id === 'q3_2' ? (
                                !selectedValue.includes('4') ? (
                                  '혈관성 위험 요인이 있으실 수 있습니다. 안과 진료 시 이 내용을 함께 말씀해 주세요.'
                                ) : (
                                  '기립성 저혈압이나 빈번한 수족냉증 등의 혈관성 증상 우려가 적은 편입니다. 양호한 상태입니다.'
                                )
                              ) : ''}
                            </p>
                          </div>
                        )}

                        {/* Q11 스마트 워치 감지 전용 안내 오버레이 */}
                        {subQ.id === 'q11_1' && watchIrrPulseDetected && (
                          <div className="mt-2.5 p-3 rounded-xl bg-violet-soft border border-violet/25 text-xs rise-in">
                            <div className="flex items-center gap-1.5 text-violet font-black mb-1">
                              <Heart size={12} className="animate-beat" />
                              <span>스마트워치 자동 플래그 연동 중</span>
                            </div>
                            <p className="text-[10px] text-ink-2 leading-normal">
                              환자 수기 선택 외에 워치 센서에서 [불규칙 맥박 알림(IRN) 감지됨] 플래그가 병기되어 기록되며, 의료진 화면에는 <strong>'워치 감지·미확진'</strong>으로 최종 출력됩니다. 심전도(ECG) 확인을 권장합니다.
                            </p>
                          </div>
                        )}

                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* 실시간 문진 결과 보고서 (평가 점수 산출) */}
        {(() => {
          let totalScore = 0
          let count = 0
          const answeredDetails = []

          SURVEY_QUESTIONS.forEach(q => {
            q.subQuestions.forEach(subQ => {
              if (subQ.type !== 'single') return

              // 의존성 체크
              if (subQ.dependsOn) {
                const parentKey = Object.keys(subQ.dependsOn)[0]
                const allowedValues = subQ.dependsOn[parentKey]
                const parentAnswer = answers[parentKey]
                if (!parentAnswer || !allowedValues.includes(parentAnswer)) {
                  return
                }
              }

              const selectedValue = answers[subQ.id]
              if (selectedValue) {
                const index = subQ.options.findIndex(o => o.value === selectedValue)
                let score = 100
                if (index === 0) score = 100
                else if (index === 1) score = 75
                else if (index === 2) score = 50
                else if (index === 3) score = 25
                else score = 25

                totalScore += score
                count++

                const selectedOptionText = subQ.options[index]?.text || ''
                answeredDetails.push({
                  qTitle: q.title.split('. ')[1] || q.title,
                  subQLabel: subQ.label,
                  selectedText: selectedOptionText.replace(/^[①②③④⑤]\s*/, ''),
                  score,
                  risk: subQ.options[index]?.risk || '-'
                })
              }
            })
          })

          const average = count > 0 ? Math.round(totalScore / count) : 0

          return (
            <div className="mt-5 bg-surface border border-warn rounded-2xl p-4 card-shadow select-none animate-in fade-in duration-300">
              <div 
                onClick={() => setShowResult(!showResult)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <h3 className="text-sm font-bold text-warn group-hover:text-warn transition-colors flex items-center gap-1.5">
                    <span>실시간 문진 결과 보고서</span>
                  </h3>
                  <p className="text-[10px] text-ink-3 mt-0.5">
                    답변 완료: {count}개 문항 (클릭 시 상세 열람)
                  </p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-lg font-black text-ink">{average}점</span>
                   <span className="text-xs text-ink-3">{showResult ? '▲' : '▼'}</span>
                </div>
              </div>

              {showResult && (
                <div className="mt-4 pt-4 border-t border-line space-y-4 animate-in slide-in-from-top-3 duration-300">
                  
                  {/* 평균 점수 대시보드 */}
                  <div className="bg-warn-soft/50 rounded-xl p-3 text-center border border-line">
                    <span className="text-[10px] text-ink-3 font-bold block uppercase tracking-wider">평균 종합 평가 점수</span>
                    <span className="text-3xl font-black text-warn mt-1 block">{average} <span className="text-sm text-ink-3">/ 100점</span></span>
                    <div className="mt-2 text-xs">
                      {average >= 85 ? (
                        <span className="text-ok font-bold">🟢 아주 양호 (안압 관리 생활습관 우수)</span>
                      ) : average >= 60 ? (
                        <span className="text-warn font-bold">🟡 관리 요망 (생활습관 일부 교정 필요)</span>
                      ) : (
                        <span className="text-high font-bold">🔴 위험/경고 (안압 상승 위험 노출 높음)</span>
                      )}
                    </div>
                  </div>

                  {/* 개별 선택 상세 내역 */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {answeredDetails.length === 0 ? (
                      <p className="text-ink-3 text-xs text-center py-4">문항에 응답하시면 결과 세부 내역이 여기에 출력됩니다.</p>
                    ) : (
                      answeredDetails.map((detail, idx) => (
                        <div key={idx} className="bg-app-bg border border-line rounded-lg p-2.5 flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <span className="text-[9px] text-ink-3 font-bold block">{detail.qTitle}</span>
                            <p className="text-[10px] text-ink-2 font-semibold mt-0.5 leading-tight">{detail.subQLabel.substring(detail.subQLabel.indexOf('.') + 2)}</p>
                            <p className="text-[11px] text-warn font-medium mt-1 leading-normal">➔ {detail.selectedText}</p>
                          </div>
                          <div className="text-right shrink-0 flex flex-col items-end gap-1">
                            <span className="text-xs font-extrabold text-ink">{detail.score}점</span>
                            {detail.risk !== '-' && (
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full border ${
                                detail.risk === '고' ? 'bg-high-soft text-high border-high/30' :
                                detail.risk === '중' ? 'bg-warn-soft text-warn border-warn/30' :
                                'bg-ok-soft text-ok border-ok/30'
                              }`}>
                                {detail.risk}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })()}

      </div>
    </div>
  )
}
