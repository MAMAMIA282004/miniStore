import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    className: string,
    buttonType: "button" | "submit" | "reset" | undefined, 
    width?: string
}

const Button = ({children, className, buttonType, width = 'w-fit', ...rest} : IProps) => {
    return <button type={buttonType} className={`text-white text-lg rounded-full ${width} ${className}`} {...rest}>{children}</button>
};

export default Button;