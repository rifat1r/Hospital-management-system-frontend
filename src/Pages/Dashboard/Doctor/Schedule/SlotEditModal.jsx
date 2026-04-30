import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import TimeFields from "../../../../Components/Doctor/TimeFields";
import { FormProvider, useForm } from "react-hook-form";
import { updateScheduleSlot } from "../../../../api/doctorApi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  timeToMinutes,
  twelveHourToTwentyFourHour,
} from "../../../../utils/time&dateConversions";
import { useEffect, useState } from "react";
import { swal } from "../../../../utils/notify";
import errorMessage from "../../../../utils/errorMessage";

const SlotEditModal = ({ openModal, setOpenModal, selectedSlot }) => {
  const [conflicts, setConflicts] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    slot: { slotId, startTime, endTime } = {},
    dayOfWeek,
    refetch,
  } = selectedSlot || {};

  function onCloseModal() {
    setOpenModal(false);
  }

  const methods = useForm();
  const { handleSubmit, setFocus, reset } = methods;

  useEffect(() => {
    if (openModal) {
      setConflicts(null);
      reset({
        startTime: twelveHourToTwentyFourHour(startTime),
        endTime: twelveHourToTwentyFourHour(endTime),
      });
    }
  }, [openModal, startTime, endTime, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateScheduleSlot(axiosSecure, dayOfWeek, slotId, {
        startTime: timeToMinutes(data.startTime),
        endTime: timeToMinutes(data.endTime),
      });
      // console.log("edit slot res--", res);
      if (res.success) {
        swal("success", "Success!", res.message, true);
      }
      refetch();
      setOpenModal(false);
    } catch (error) {
      // console.log("errors from update slot", error);

      // when the provided slot overlaps withy existing ones
      if (error.response.status === 400) {
        setConflicts(slotId);
      }
      swal("error", "Error!!!", errorMessage(error));
    }
  };

  //set focus to start time on modal open
  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        setFocus("startTime");
      }, 50);
    }
  }, [setFocus, openModal]);

  return (
    <>
      <FormProvider {...methods}>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <ModalHeader />
          <ModalBody>
            <h2 className="pb-5 text-xl font-medium">Edit Schedule Slot</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TimeFields conflicts={conflicts} slotId={slotId} />
              <div className="">
                <Button outline type="submit" className="w-full mt-5">
                  Save
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </FormProvider>
    </>
  );
};

export default SlotEditModal;
