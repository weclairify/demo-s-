"use client";

import { motion } from "framer-motion";

interface HandWrittenTitleProps {
    title?: string;
    subtitle?: string;
}

function HandWrittenTitle({
    title = "Hand Written",
    subtitle = "Optional subtitle",
}: HandWrittenTitleProps) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="absolute inset-0">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1200 700"
                    initial="hidden"
                    animate="visible"
                    className="w-full h-full"
                >
                    <title>KokonutUI</title>
                    <motion.path
                        d="M 1050 100
                           C 1300 200, 1300 500, 1050 600
                           C 800 720, 400 720, 150 600
                           C -100 500, -100 200, 150 100
                           C 400 -20, 800 -20, 1050 100
                           Z"
                        fill="none"
                        strokeWidth="20"
                        stroke="var(--primary)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        opacity={0.9}
                    />
                </motion.svg>
            </div>
            <div className="relative text-center z-10 flex flex-col items-center justify-center">
                <motion.h1
                    className="font-display text-4xl md:text-5xl tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        className="text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
}

export { HandWrittenTitle };
