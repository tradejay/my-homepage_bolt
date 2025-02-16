"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import { supabase } from "@/lib/supabase";
import {
  parseISO,
  isWithinInterval,
  format,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAdminSession } from "@/lib/admin-auth";

// 미리 정의한 색상 배열 (TailwindCSS 클래스)
const eventColors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-red-100",
];

// 이벤트 id 기반 색상 결정 함수
function getColorForEventId(id: string) {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return eventColors[sum % eventColors.length];
}

export default function CalendarManagement() {
  const { adminUser } = useAdminSession();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 선택된 날짜 및 모달 관련 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<any[]>([]);

  // 신규 일정 등록/수정 폼 상태
  const [newEvent, setNewEvent] = useState({
    id: null as string | null,
    title: "",
    start_date: "",
    end_date: "",
  });

  // 모달 모드: false = 일별(weekly), true = 월간(monthly) 일정 등록
  const [isMonthlyMode, setIsMonthlyMode] = useState(false);

  const { toast } = useToast();

  // react-modal 접근성 설정
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  // DB에서 일정(이벤트) 조회
  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("start_date", { ascending: true });
    if (error) {
      toast({
        title: "Error",
        description: "일정을 불러오지 못했습니다.",
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 달력 타일에 등록된 일정 간략히 표시 (일별 일정만 표시, 월간 일정은 상단 영역에서 조회)
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dayEvents = events.filter((event) => {
        if (event.calendar_type === "monthly") return false;
        const start = parseISO(event.start_date);
        const end = parseISO(event.end_date);
        return isWithinInterval(date, { start, end });
      });
      if (dayEvents.length > 0) {
        return (
          <ul className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((ev) => (
              <li
                key={ev.id}
                className={`text-xs rounded px-1 overflow-hidden text-ellipsis ${getColorForEventId(
                  ev.id
                )}`}
                title={ev.title}
                style={{ wordBreak: "break-all" }}
              >
                {ev.title}
              </li>
            ))}
            {dayEvents.length > 2 && (
              <li className="text-xs text-blue-500">
                +{dayEvents.length - 2}
              </li>
            )}
          </ul>
        );
      }
    }
    return null;
  };

  // 날짜 클릭 시 모달 열기 (일별 일정 등록/수정)
  const handleTileClick = (date: Date) => {
    setIsMonthlyMode(false);
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    setNewEvent({
      id: null,
      title: "",
      start_date: formattedDate,
      end_date: formattedDate,
    });
    const dayEvents = events.filter((event) => {
      if (event.calendar_type === "monthly") return false;
      const start = parseISO(event.start_date);
      const end = parseISO(event.end_date);
      return isWithinInterval(date, { start, end });
    });
    setSelectedDayEvents(dayEvents);
    setModalIsOpen(true);
  };

  // 월간 일정 등록 버튼 클릭 시 모달 열기
  const handleMonthlyClick = () => {
    setIsMonthlyMode(true);
    const startDate = format(startOfMonth(selectedDate), "yyyy-MM-dd");
    const endDate = format(endOfMonth(selectedDate), "yyyy-MM-dd");
    setNewEvent({
      id: null,
      title: "",
      start_date: startDate,
      end_date: endDate,
    });
    const monthEvents = events.filter((event) => {
      if (event.calendar_type !== "monthly") return false;
      const eventDate = parseISO(event.start_date);
      return eventDate >= startOfMonth(selectedDate) && eventDate <= endOfMonth(selectedDate);
    });
    setSelectedDayEvents(monthEvents);
    setModalIsOpen(true);
  };

  // 모달 내 폼 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // 신규 일정 등록 또는 기존 일정 수정 (calendar_type 저장)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start_date || !newEvent.end_date) {
      toast({
        title: "Warning",
        description: "제목, 시작 날짜, 종료 날짜를 모두 입력하세요.",
        variant: "destructive",
      });
      return;
    }
    if (!adminUser) {
      toast({
        title: "Error",
        description: "관리자 로그인 후에 등록할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }
    const calendar_type = isMonthlyMode ? "monthly" : "weekly";
    if (newEvent.id) {
      // 기존 일정 수정
      const { error } = await supabase
        .from("calendar_events")
        .update({
          title: newEvent.title,
          start_date: newEvent.start_date,
          end_date: newEvent.end_date,
          calendar_type,
        })
        .eq("id", newEvent.id);
      if (error) {
        toast({
          title: "Error",
          description: "일정 수정에 실패했습니다.",
          variant: "destructive",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "일정이 수정되었습니다.",
        });
      }
    } else {
      // 신규 일정 등록
      const { error } = await supabase.from("calendar_events").insert([
        {
          title: newEvent.title,
          start_date: newEvent.start_date,
          end_date: newEvent.end_date,
          user_id: adminUser.id,
          calendar_type,
        },
      ]);
      if (error) {
        toast({
          title: "Error",
          description: "일정 등록에 실패했습니다.",
          variant: "destructive",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "일정이 등록되었습니다.",
        });
      }
    }
    setModalIsOpen(false);
    fetchEvents();
  };

  // 개별 일정 삭제 핸들러 (모달 내 각 항목의 삭제 버튼)
  const handleDeleteEvent = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: "일정 삭제에 실패했습니다.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "일정이 삭제되었습니다.",
      });
      fetchEvents();
      setSelectedDayEvents(selectedDayEvents.filter((ev) => ev.id !== id));
    }
  };

  // 기존 일정 클릭 시 해당 일정을 수정 모드로 전환
  const handleEventClick = (event: any) => {
    setNewEvent({
      id: event.id,
      title: event.title,
      start_date: event.start_date,
      end_date: event.end_date,
    });
  };

  if (loading) {
    return <p className="text-center mt-4">달력을 불러오는 중...</p>;
  }

  // 월간 일정 조회: 현재 선택한 달의 월간 일정 (calendar_type === "monthly")
  const monthlyEvents = events.filter((event) => {
    if (event.calendar_type !== "monthly") return false;
    const eventDate = parseISO(event.start_date);
    return eventDate >= startOfMonth(selectedDate) && eventDate <= endOfMonth(selectedDate);
  });

  return (
    <div className="w-full h-screen flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">일정 관리</h2>

      {/* 월간 일정 조회 영역 */}
      <div className="mb-4 border rounded bg-white">
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            {format(selectedDate, "yyyy년 MM월")} 월간 일정
          </p>
          <button
            onClick={handleMonthlyClick}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            월간 일정 등록
          </button>
        </div>
        {monthlyEvents.length > 0 ? (
          <ul className="mt-2 space-y-1">
            {monthlyEvents.map((ev) => (
              <li
                key={ev.id}
                className={`text-sm rounded px-2 py-1 truncate ${getColorForEventId(ev.id)}`}
                title={ev.title}
              >
                {ev.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-2">등록된 월간 일정이 없습니다.</p>
        )}
      </div>

      {/* 달력 영역 */}
      <div className="flex-1 overflow-auto flex justify-center">
        <Calendar
          onClickDay={handleTileClick}
          value={selectedDate}
          tileContent={tileContent}
          onActiveStartDateChange={({ activeStartDate }) => {
            // activeStartDate는 해당 달의 첫날을 나타냅니다.
            if (activeStartDate) {
              setSelectedDate(activeStartDate);
            }
          }}
          className="w-full h-full text-base"
          showFixedNumberOfWeeks={false}
          showNeighboringMonth={false}
        />
      </div>

      {/* 모달: 해당 날짜(또는 월간) 일정 등록/수정 및 기존 일정 목록 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="일정 등록/수정"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        className="bg-white rounded shadow-lg max-w-md w-full mx-auto outline-none sm:max-w-full sm:h-4/5 sm:overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">
          {isMonthlyMode
            ? `${format(selectedDate, "yyyy년 MM월")} 월간 일정 등록/수정`
            : `${format(selectedDate, "yyyy-MM-dd")} 일정 등록/수정`}
        </h2>

        {/* 등록된 일정 목록 영역 */}
        <div className="mb-4 border-b pb-2">
          <p className="font-semibold mb-2">등록된 일정</p>
          {selectedDayEvents.length > 0 ? (
            <ul className="space-y-2">
              {selectedDayEvents.map((ev) => (
                <li
                  key={ev.id}
                  className="flex items-center justify-between border p-2 rounded truncate"
                >
                  <div onClick={() => handleEventClick(ev)} className="cursor-pointer truncate">
                    <p className="text-sm truncate">
                      {format(parseISO(ev.start_date), "yyyy-MM-dd")} ~{" "}
                      {format(parseISO(ev.end_date), "yyyy-MM-dd")}
                    </p>
                    <p className="font-bold truncate">{ev.title}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              {isMonthlyMode
                ? "해당 월에 등록된 일정이 없습니다."
                : "해당 날짜에 등록된 일정이 없습니다."}
            </p>
          )}
        </div>

        {/* 신규 일정 등록 영역 */}
        <div>
          <p className="font-semibold mb-2">
            {isMonthlyMode ? "신규 월간 일정 등록" : "신규 일정 등록"}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isMonthlyMode ? null : (
              <>
                <div>
                  <label className="block mb-1">시작 날짜</label>
                  <input
                    type="date"
                    name="start_date"
                    value={newEvent.start_date}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">종료 날짜</label>
                  <input
                    type="date"
                    name="end_date"
                    value={newEvent.end_date}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block mb-1">제목</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="일정 제목 입력"
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                {newEvent.id ? "일정 수정" : "일정 등록"}
              </button>
            </div>
          </form>
        </div>

        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded w-full"
        >
          닫기
        </button>
      </Modal>
    </div>
  );
}
