import { ReactNode } from "react";

interface GridProps {
    children: ReactNode;
}


export default function Grid({ children }: GridProps) {
    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            {children}
        </div>
    )
}