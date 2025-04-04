export default function Title({ variant, text, className = '', mode = "dark", ...props}: {variant: "h1" | "h2" | "h3", text: string, className?: string, mode?: "dark" | "light"}) {
    const variants = {
        h1: "text-5xl font-bold lg:text-7xl",
        h2: "text-3xl md:text-4xl font-semibold",
        h3: "text-2xl font-medium tracking-tight"
    };

    const modes = {
        dark: "bg-gradient-to-b from-zinc-50 to-zinc-300 bg-clip-text text-transparent",
        light: "text-neutral-950"
    }

    return (
        <h1 className={`text-pretty font-roboto ${modes[mode]} ${variants[variant]} ${className}`} {...props}>
            {text}
        </h1>
    );
}