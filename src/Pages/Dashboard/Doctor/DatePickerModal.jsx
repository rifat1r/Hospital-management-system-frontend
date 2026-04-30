import { Datepicker, Modal, ModalBody, ModalHeader } from "flowbite-react";
import dateFormatter from "../../../utils/dateFormatter";

// DatePickerModal.jsx
const DatePickerModal = ({
  openModal,
  setOpenModal,
  setPickedDate,
  setActiveDate,
  pickedDate,
}) => {
  return (
    <div className="">
      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          if (!pickedDate) {
            setActiveDate("all"); // if a date is not picked, while closing it will be set to "all"
          }
        }}
        size="sm"
      >
        <ModalHeader>Pick a Date</ModalHeader>
        <ModalBody className="flex justify-center">
          <Datepicker
            inline
            onChange={(date) => {
              setPickedDate(dateFormatter(date));
              setActiveDate("pick date");
              setOpenModal(false);
            }}
            showClearButton={false}
            showTodayButton={false}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default DatePickerModal;
