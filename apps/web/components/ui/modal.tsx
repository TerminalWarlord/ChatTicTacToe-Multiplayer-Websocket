import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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


export default Modal;
// export function Modal({ title, subTitle, isOpen }: { title: string, subTitle: string, isOpen: boolean }) {
//     return (
//         <Dialog open={isOpen}>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>{title}</DialogTitle>
//                     <DialogDescription>
//                         {subTitle}
//                     </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter>
//                     <form method="dialog">
//                         <Button>Save changes</Button>
//                     </form>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog >
//     )
// }
