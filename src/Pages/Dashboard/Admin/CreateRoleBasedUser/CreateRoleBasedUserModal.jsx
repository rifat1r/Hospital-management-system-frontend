import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { notify } from "../../../../utils/notify";
import ErrorMsg from "../../../../Components/ErrorMsg";
import UserForm from "../../../../Components/Shared/UserForm";
import { IoMdPersonAdd } from "react-icons/io";

const CreateRoleBasedUserModal = ({ role }) => {
  const [openModal, setOpenModal] = useState(false);

  const { createUser } = useAuth();
  // on submit
  const onSubmit = async (data) => {
    try {
      const res = await createUser(data);
      console.log(res.data);
      if (res.status === 201) {
        notify(`${res.data.msg}`, "success");
        // reset();
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        notify(error.response.data.message, "error");
      }
    }
  };

  return (
    <>
      <Button
        color="blue"
        className="px-6 py-5 mb-3 ml-3"
        onClick={() => setOpenModal(true)}
      >
        <IoMdPersonAdd className="text-base mr-2" />
        Create a {role}
      </Button>
      <Modal
        show={openModal}
        size="2xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6 ">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8  ">
              Register a new {role}
            </h3>

            <UserForm role={role} onSubmit={onSubmit} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CreateRoleBasedUserModal;
