"use client";

import { useEffect, useState } from 'react';
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CalendarSection() {
  const yearlySchedule = [
    // 1분기
    { name: "1월", events: [
      "신년 업계 동향 분석", "의료기기 시장 전망 세미나", "디지털헬스케어 컨퍼런스",
      "제약산업 신년회", "바이오헬스 투자포럼", "의료정책 설명회"
    ]},
    { name: "4월", events: [
      "1분기 실적 발표회", "의료기기 인증 세미나", "제약바이오 채용박람회",
      "디지털헬스 심포지엄", "의료 AI 컨퍼런스", "바이오헬스 전시회"
    ]},
    { name: "7월", events: [
      "상반기 업계 리뷰", "하계 의료기기 전시회", "제약산업 혁신포럼",
      "디지털헬스 해커톤", "바이오헬스 투자설명회", "의료정책 토론회"
    ]},
    { name: "10월", events: [
      "3분기 실적 발표회", "추계 제약바이오 컨퍼런스", "의료기기 수출상담회",
      "디지털헬스 어워드", "바이오헬스 일자리 페어", "의료정책 세미나"
    ]},
    // 2분기
    { name: "2월", events: [
      "의료 AI 심포지엄", "제약산업 정책포럼", "의료기기 품질관리 세미나",
      "디지털헬스 투자설명회", "바이오헬스 규제개선 포럼", "의료산업 전망 컨퍼런스"
    ]},
    { name: "5월", events: [
      "바이오헬스 투자설명회", "의료기기 규제포럼", "제약산업 전략회의",
      "디지털헬스 해외진출 세미나", "의료 빅데이터 컨퍼런스", "바이오헬스 창업 경진대회"
    ]},
    { name: "8월", events: [
      "상반기 결산 세미나", "의료기기 수출전략 포럼", "제약바이오 특허전략 설명회",
      "디지털헬스 규제샌드박스 설명회", "바이오헬스 R&D 포럼", "의료산업 혁신전략 세미나"
    ]},
    { name: "11월", events: [
      "의료정책 세미나", "제약산업 윤리경영 포럼", "의료기기 품질관리 컨퍼런스",
      "디지털헬스 표준화 세미나", "바이오헬스 투자유치 설명회", "의료산업 발전방안 토론회"
    ]},
    // 3분기
    { name: "3월", events: [
      "의료기기 인증 컨퍼런스", "제약산업 R&D 포럼", "디지털헬스 규제개선 세미나",
      "바이오헬스 수출전략 설명회", "의료정책 개선방안 토론회", "헬스케어 스타트업 데모데이"
    ]},
    { name: "6월", events: [
      "상반기 업계 리뷰", "의료기기 안전성 세미나", "제약바이오 특허전략 포럼",
      "디지털헬스 표준화 컨퍼런스", "바이오헬스 해외진출 전략회의", "의료산업 발전방안 심포지엄"
    ]},
    { name: "9월", events: [
      "바이오헬스 일자리 박람회", "의료기기 GMP 세미나", "제약산업 품질관리 포럼",
      "디지털헬스 보안 컨퍼런스", "바이오헬스 창업 지원설명회", "의료정책 개선 토론회"
    ]},
    { name: "12월", events: [
      "연말 업계 결산", "의료기기 전망 세미나", "제약바이오 연말 포럼",
      "디지털헬스 성과발표회", "바이오헬스 투자유치 설명회", "차년도 의료정책 설명회"
    ]}
  ];

  const monthlySchedule = [
    { name: "1주차", events: [
      "주간 업계 동향 리뷰", "의료기기 품질관리 교육", "제약산업 정책 간담회",
      "디지털헬스 기술 세미나", "바이오헬스 투자 상담", "의료정책 자문회의"
    ]},
    { name: "2주차", events: [
      "신제품 발표회", "의료기기 안전성 평가", "제약바이오 연구회",
      "AI 헬스케어 포럼", "스타트업 피칭데이", "규제개선 토론회"
    ]},
    { name: "3주차", events: [
      "임상시험 설명회", "의료기기 수출 상담", "제약산업 실무협의회",
      "디지털헬스 보안 교육", "투자유치 설명회", "정책평가 워크숍"
    ]},
    { name: "4주차", events: [
      "월간 성과 보고회", "품질관리 감사", "신약개발 컨퍼런스",
      "데이터 표준화 회의", "해외진출 전략회의", "의료정책 평가회"
    ]}
  ];

  return (
    <div className="relative border-2 border-primary/50 rounded-lg p-4 space-y-8">
      {/* Title */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">일정</span>
        </div>
      </div>

      {/* Yearly Schedule */}
      <div>
        <div className="mb-4 text-sm font-medium text-gray-500 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          연간 일정
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {yearlySchedule.map((month, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{month.name}</h4>
                <ul className="space-y-1">
                  {month.events.map((event, eventIndex) => (
                    <li key={eventIndex} className="text-xs text-gray-600">• {event}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Monthly Schedule */}
      <div>
        <div className="mb-4 text-sm font-medium text-gray-500 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          월간 일정
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlySchedule.map((week, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{week.name}</h4>
                <ul className="space-y-1">
                  {week.events.map((event, eventIndex) => (
                    <li key={eventIndex} className="text-xs text-gray-600">• {event}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}