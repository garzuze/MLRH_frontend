export default function Button({ variant = 'default', text, className, ...props }: {variant?: 'default' | 'dark', text: string, className?: string}) {
    const variants = {
        default: 'bg-zinc-100 hover:bg-zinc-300 text-black',
        dark: 'bg-neutral-950 border-2 border-neutral-800 text-zinc-50'
    }

    return (
        <button className={`m-2 p-3 rounded-md w-40 font-bold ${variants[variant]} ${className}`} {...props}>
            {text}
        </button>
    );
}