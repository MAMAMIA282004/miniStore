export interface cardProps {
    title: string;
    description: string;
    colors: string[];
    price: null | string;
    category: string;
    srcImage: string;
    isPaid: boolean;
    idx: number;
}

export interface IDialog {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

export type ICombined = IDialog & cardProps;

export const emptyCard: ICombined = {
    title: '',
    description: '',
    colors: [],
    price: '',
    category: 'Course',
    srcImage: '',
    isPaid: false,
    idx: -1,
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsOpen: (_val: boolean) => { },
};
