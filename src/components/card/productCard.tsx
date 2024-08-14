import { useRef } from 'react';
import Image from "../UI/images/Image";
import './productCard.scss'
import { ICombined } from "../../interfaces/props";
import { ReactNode } from "react";

interface IProps extends ICombined {
    children: ReactNode
}

const ProductCard = ({ isPaid, category, description, colors, price, title, srcImage, children }: IProps) => {
    const colorRefs = useRef<HTMLSpanElement[]>([]);

    const handleColorClick = (index: number) => {
        colorRefs.current.forEach(span => span.classList.remove('active'));
        if (colorRefs.current[index])
            colorRefs.current[index].classList.add('active');
    };

    const colorSpans: JSX.Element[] = colors.map((col, index) => (
        <span key={index} className={`block w-5 h-5 rounded-full border-slate-300 border-2 cursor-pointer hover:scale-125 ${!index ? 'active' : ''} ${col}`} ref={el => colorRefs.current[index] = el!} onClick={() => handleColorClick(index)}></span>
    ));

    return (
        <div className="product-card mb-4">
            <div className="photo">
                <Image imageUrl={srcImage} altText="product photo" />
            </div>
            <div>
                <h3 className="head text-xl break-words">{title}</h3>
                <p className="text-sm mt-2 break-words">{description}</p>
            </div>
            <div className="flex gap-1 my-4 flex-wrap">
                {colorSpans}
            </div>
            <div>
                <div className="flex justify-between">
                    <p>{isPaid ? `$${price}` : 'Free'}</p>
                    <div className="flex gap-2 items-center">
                        <Image imageUrl={srcImage} altText="category photo" className="w-8 h-8 rounded-full object-cover" />
                        <p>{category}</p>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ProductCard;
