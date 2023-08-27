import { useRef } from "react";
import Button from "./ui/button";

import DeleteButton from "./DeleteButton";
import type { IDeleteButton } from "./DeleteButton";

import { DialogHTMLAttributes, forwardRef } from "react";

interface IModal
  extends DialogHTMLAttributes<HTMLDialogElement>,
    Omit<IDeleteButton, "modalRef"> {}

const Modal = forwardRef<HTMLDialogElement, IModal>(
  (
    { currentUserId, deletedUserId, currentUserPermissions, children, ...rest },
    ref
  ) => {
    return (
      <dialog className="relative rounded-xl" ref={ref} {...rest}>
        <Button
          className="absolute right-2 top-2 z-10 font-bold"
          onClick={() => ref?.current?.close()}
          label="X"
          variant="monochrome"
        />
        <div className="mx-auto flex flex-col gap-4 p-8">
          <div className="flex items-start gap-8">
            <article>
              <h1 className="text-center text-2xl font-bold">Delete Account</h1>
              <p className="my-5">
                Do you want to delete user with ID {deletedUserId} ?
              </p>
            </article>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => ref?.current?.close()} label="Cancel" />
            <DeleteButton
              modalRef={ref}
              currentUserId={currentUserId}
              deletedUserId={deletedUserId}
              currentUserPermissions={currentUserPermissions}
            />
          </div>
        </div>
      </dialog>
    );
  }
);

export default Modal;
