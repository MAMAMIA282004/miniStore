interface Iprops {
    altText: string,
    className?: string,
    imageUrl: string
}

const Image = ({className, altText, imageUrl} : Iprops) => {
    return <img src={imageUrl} alt={altText} className={className}></img>
}

export default Image;