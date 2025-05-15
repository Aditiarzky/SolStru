import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function AlertConfirmation({
  title = "Konfirmasi",
  message = "Apakah Anda yakin ingin melanjutkan?",
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  triggerButtonText = "Buka Konfirmasi",
  triggerButtonVariant = "default",
  isOpen,
  setIsOpen,
  className = "",
  disabled = false,
}) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    if (setIsOpen) setIsOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={triggerButtonVariant}
        className={className}
        onClick={() => setIsOpen?.(true)}
        disabled={disabled}
      >
        {triggerButtonText}
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
