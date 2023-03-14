import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import dayjs, { Dayjs } from "dayjs";
import { Fragment, useState } from "react";
import { Note } from "../App";

export type DialogProps = {
  isOpen: boolean;
  notes: Note[];
  onClose: () => void;
  date: Dayjs;
  onNoteAdd: (note: Note) => void;
  onNoteDelete: (keyToDelete: number) => void;
};

export const Dialog = ({
  isOpen,
  onClose,
  date,
  notes,
  onNoteAdd,
  onNoteDelete,
}: DialogProps) => {
  const [noteValue, setNoteValue] = useState("");

  function handleChange(event: any) {
    const newValue = event.target.value;
    setNoteValue(newValue);
    console.log(noteValue);
  }

  function addNote() {
    const newNote: Note = {
      key: dayjs().unix(),
      text: noteValue,
      date: date,
    };
    onNoteAdd(newNote);
    setNoteValue("");
  }

  function deleteNote(keyToDelete: number) {
    onNoteDelete(keyToDelete);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <HeadlessDialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add note
                  </HeadlessDialog.Title>
                  <div className="mt-2">
                    <input
                      className="border-2"
                      onChange={handleChange}
                      type="text"
                      value={noteValue}
                    ></input>
                    <button
                      type="submit"
                      onClick={addNote}
                      className="hover:bg-[#FFD4B2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD4B2] focus-visible:ring-offset-2"
                    >
                      <i className="fa-regular fa-calendar-plus"></i>
                    </button>
                    <ul>
                      {notes?.map((note, i) => (
                        <div key={note.key}>
                          <li className="border-2">{note.text}</li>
                          <li className="border-2">
                            {note.date.toDate().toLocaleDateString()}
                          </li>
                          <button
                            className="hover:bg-[#FFD4B2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD4B2] focus-visible:ring-offset-2"
                            onClick={() => deleteNote(note.key)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md px-4 py-2 hover:bg-[#FFD4B2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD4B2] focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      <i className="fa-regular fa-rectangle-xmark"></i>
                    </button>
                  </div>
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    </>
  );
};
