import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface LimitModalProps {
  open: boolean;
  setopen: (open: boolean) => void;
}

const LimitModal: React.FC<LimitModalProps> = ({ open, setopen }) => {
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You have reached the free limit.</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Thank you for using our service. You have reached the free limit.
          Please upgrade to continue using our service.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default LimitModal;
