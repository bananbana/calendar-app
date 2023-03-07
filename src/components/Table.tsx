import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Note } from "../App";

export type TableProps = {
  calendarDate: Dayjs;
  onModalOpen: (day: Dayjs) => void;
  notes: Note[];
};

export const Table = ({ calendarDate, onModalOpen, notes }: TableProps) => {
  const getCalendarDays = (year: number, month: number) => {
    const currentMonthDate = dayjs(new Date(year, month, 1));
    const firstDayOfMonth = currentMonthDate.get("day");
    const daysFromLastMonth = firstDayOfMonth > 0 ? firstDayOfMonth - 1 : 6;

    const calendarDays: Dayjs[] = [];
    for (let i = 0; i < 35; i++) {
      if (i < daysFromLastMonth) {
        const daysToSubstract = daysFromLastMonth - i;
        const date = currentMonthDate.subtract(daysToSubstract, "day");
        calendarDays.push(date);
      } else if (i >= daysFromLastMonth) {
        const daysToAdd = i - daysFromLastMonth;
        const date = currentMonthDate.add(daysToAdd, "day");
        calendarDays.push(date);
      }
    }

    const calendarDaysMatrix = [];
    for (let i = 0; i < 5; i++) {
      const startIndex = i * 7;
      const calendarRow = calendarDays.slice(startIndex, startIndex + 7);
      calendarDaysMatrix.push(calendarRow);
    }
    return calendarDaysMatrix;
  };

  const daysInAWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendarDays = getCalendarDays(
    calendarDate.year(),
    calendarDate.month()
  );

  return (
    <div className="container max-w-fit h-auto p-4">
      <table className="table-fixed h-max w-full border border-collapse border-[#CEEDC7]">
        <thead className="border border-[#CEEDC7] border-solid">
          <tr className="border-[#CEEDC7]">
            {daysInAWeek.map((day) => (
              <th className="bg-[#FFF6BD] border-solid border border-[#CEEDC7]">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarDays.map((rowDays) => (
            <tr className="border border-solid border-[#CEEDC7] h-32 relative text-right">
              {rowDays.map((day) => (
                <td
                  onClick={() => onModalOpen(day)}
                  className="pb-12 pl-12 border-solid border bg-[#FFD4B2] bg-opacity-80 shadow-xl border-[#CEEDC7]"
                >
                  <div>
                    <p className="p-2">{day.date()}</p>
                    <ul className="flex items-start">
                      {notes
                        .filter((note) => note.date.isSame(day, "day"))
                        .map((note) => (
                          <li className="w-[70px] text-justify-right px-1 my-1 rounded-[5px] bg-[#86C8BC]">
                            {note.text}
                          </li>
                        ))}
                    </ul>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
