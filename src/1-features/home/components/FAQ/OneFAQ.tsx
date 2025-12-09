import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion"
import classes from "./OneFAQ.module.css"
import React, { useEffect, useState } from "react";


const OneFAQ = ({ Question, answer }: { Question: string, answer: string }) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (!ref.current?.contains(e.target as Node)) {
                setIsExpanded(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [ref])

    return (
        <>
            <div

                ref={ref}
                className={`${classes.oneFAQ} ${isExpanded ? classes.open : ""}`}
            >
                <div
                    onClick={
                        () => setIsExpanded(!isExpanded)
                    }
                    className={`${classes.FAQContainer} ${isExpanded ? classes.open : ""}`}>
                    <h3>{Question}</h3>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <IoIosArrowDown className={`${classes.openIcon} ${isExpanded ? classes.open : ""}`}
                        />
                    </motion.div>
                </div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <p className={classes.answer}>{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default OneFAQ;