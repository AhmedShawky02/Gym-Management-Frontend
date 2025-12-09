import { FaCaretDown } from "react-icons/fa";
import classes from "./DropDownList.module.css";
import type { IconType } from "react-icons";
import React, { useEffect, useState } from "react";
import { Form, Link, type HTMLFormMethod } from "react-router-dom";

type MyIconType = {
    Icon: IconType,
    fontSize: number
}

type Links = { To: string, Icon: MyIconType, Label: string, onClick?: any, Form?: { isForm: boolean, FormAction: string, method: HTMLFormMethod } }[];

const DropDownList = ({
    label,
    Icon,
    Links,
    onClick,
}: {
    label: string,
    Icon: MyIconType,
    Links: Links,
    onClick?: any

}) => {

    const [openDropdown, setOpenDropdown] = useState<Boolean>(false);

    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpenDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [ref])

    const handelOnClickInDropDown = () => {
        if (!onClick) return
        onClick()
    }

    const handelOnClickInLink = (onClick: any) => {
        setOpenDropdown(false);
        onClick()
    }

    return (
        <div className={classes.dropdown} ref={ref}
            onClick={handelOnClickInDropDown}
        >
            <button
                className={classes.menuButtonClick}
                onClick={() => setOpenDropdown(!openDropdown)}
            >
                <Icon.Icon fontSize={Icon.fontSize} />
                <div className={classes.containerDropMenu}>
                    <span>{label}</span>
                    <FaCaretDown size={20} style={{ paddingLeft: "5px" }} />
                </div>
            </button>

            {openDropdown &&
                <>
                    <ul className={classes.dropdownContent_Ul}>
                        {Links.map((link, index) => {
                            if (link.Form?.isForm) {
                                return (
                                    <li key={index}>
                                        <Form
                                            className={classes.FormLink}
                                            action={link.Form?.FormAction}
                                            method={link.Form.method}
                                        >
                                            <button type="submit" className={classes.FormButton}>
                                                <link.Icon.Icon fontSize={link.Icon.fontSize} />
                                                {link.Label}
                                            </button>
                                        </Form>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={index}>
                                        <Link to={link.To}
                                            onClick={() => { handelOnClickInLink(link.onClick) }}
                                        >
                                            <link.Icon.Icon fontSize={link.Icon.fontSize} />
                                            {link.Label}
                                        </Link>
                                    </li>
                                )
                            }

                        })}
                    </ul>
                </>
            }

        </div>
    );
};

export default DropDownList;
