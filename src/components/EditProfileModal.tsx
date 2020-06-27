import React, {FC, useState} from "react";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";

export const EditProfileModal: FC = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div>
                <Input
                    placeholder={"Your name"}
                />
            </div>
        </Modal>
    )
};