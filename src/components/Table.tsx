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
    <div className="grid grid-cols-7 content-center m-4">
      <table className="table-fixed border border-collapse border-[#CEEDC7]">
        <thead className="border-2 border-[#CEEDC7] border-solid">
          <tr className="border-[#CEEDC7]">
            {daysInAWeek.map((day) => (
              <th className="bg-[#FFF6BD] border-solid border-2 border-[#CEEDC7]">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {calendarDays.map((rowDays) => (
            <tr className="border-2 border-solid border-[#CEEDC7]">
              {rowDays.map((day) => (
                <td
                  onClick={() => onModalOpen(day)}
                  className="border-solid border-2 bg-[#FFD4B2] bg-opacity-80 shadow-xl border-[#CEEDC7]"
                >
                  <div className="">
                    <p>{day.date()}</p>
                    <ul className="">
                      {notes
                        .filter((note) => note.date.isSame(day, "day"))
                        .map((note) => (
                          <li className="rounded-[5px] bg-[#86C8BC]">
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
