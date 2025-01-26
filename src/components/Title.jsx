export default function Title({ variant, text, className, ...props }) {
    const variants = {
        h1: "text-5xl font-bold lg:text-7xl",
        h2: "text-3xl md:text-4xl font-semibold",
        h3: "text-2xl font-medium tracking-tight text-zinc-50"
    };

    return (
        <h1 className={`text-pretty bg-gradient-to-b from-zinc-50 to-zinc-300 bg-clip-text text-transparent font-roboto ${variants[variant]} ${className}`}>
            {text}
        </h1>
    );
}