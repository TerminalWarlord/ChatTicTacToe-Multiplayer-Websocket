import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useImperativeHandle } from "react"
import { useState } from "react"
import { forwardRef } from "react"


const Modal = forwardRef(({ title, subtitle }: { title: string, subtitle: string }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }));

    if (!isOpen) return null;
    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {subtitle}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => setIsOpen(false)}>Okay</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog >
})

Modal.displayName = "Modal";

export default Modal;
