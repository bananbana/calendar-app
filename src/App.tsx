import { useEffect, useState } from "react";
import "./App.css";
import dayjs, { Dayjs } from "dayjs";
import { Select } from "./components/Select";
import { Dialog } from "./components/Dialog";
import { Table } from "./components/Table";

export type Note = {
  key: number;
  text: string;
  date: Dayjs;
};

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noteDate, setNoteDate] = useState(dayjs());
  const [notes, setNotes] = useState<Note[]>([]);

  const prevMonth = () => {
    setSelectedDate((selectedDate) => selectedDate.subtract(1, "month"));
  };

  const nextMonth = () => {
    setSelectedDate((selectedDate) => selectedDate.add(1, "month"));
  };

  const monthsInYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const yearsOptions = arrayRange(
    selectedDate.year() - 50,
    selectedDate.year() + 50,
    1
  ).map((year) => year.toString());

  const monthChange = (index: number) => {
    setSelectedDate((prevDate) => {
      return prevDate.month(index);
    });
  };

  const yearChange = (index: number) => {
    setSelectedDate((prevDate) => {
      return prevDate.year(parseInt(yearsOptions[index]));
    });
  };

  const openModal = (day: Dayjs) => {
    setIsDialogOpen(true);
    setNoteDate(day);
  };

  const addNote = (note: Note) => {
    setNotes((prev) => [...prev, note]);
  };

  return (
    <div className="bg-[#CEEDC7] h-full inline-block text-center">
      <button onClick={prevMonth} className="relative right-24 top-12 m-3">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button onClick={nextMonth} className="relative left-24 top-12 m-3">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <Select
        options={monthsInYear}
        selectedIndex={selectedDate.month()}
        onSelect={monthChange}
      />
      <Select
        options={yearsOptions}
        selectedIndex={yearsOptions.indexOf(selectedDate.year().toString())}
        onSelect={yearChange}
      />
      <Table
        calendarDate={selectedDate}
        onModalOpen={openModal}
        notes={notes}
      />
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        notes={notes.filter((note) => note.date.isSame(noteDate, "day"))}
        onNoteAdd={addNote}
        onNoteDelete={(keyToDelete) =>
          setNotes((notes) => notes.filter((note) => note.key !== keyToDelete))
        }
        date={noteDate}
      />
    </div>
  );
}

export default App;
