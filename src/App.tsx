import { useState } from "react";
import "./App.scss";
import ProductCard from "./components/card/productCard";
import "./components/UI/dialog/dialog";
import MyDialog from "./components/UI/dialog/dialog";
import { data } from "./data/data";
import { emptyCard, ICombined } from "./interfaces/props";
import Button from "./components/UI/Button/button";

function App() {
  const [isOpen, setIsOpen]: [boolean, (val: boolean) => void] = useState(false);
  const [products, updateProducts]: [ICombined[], (val: ICombined[]) => void] = useState<ICombined[]>(data.map((e, indx) => ({
    category: e._class,
    description: e.headline,
    colors: ["bg-red-500", "bg-indigo-500", "bg-orange-500"],
    price: e.price,
    title: e.title,
    srcImage: e.image_480x270,
    isPaid: e.is_paid,
    idx: indx,
    setIsOpen: setIsOpen,
    isOpen: isOpen,
  })));
  const [cardData, updateData]: [ICombined, (val: ICombined) => void] = useState(emptyCard);
  const [unselectedColors, setUnselectedColors]: [string[], (val: string[]) => void] = useState([
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-black",
    "bg-gray-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-sky-500",
    "bg-rose-900",
    "bg-pink-500",
    "bg-cyan-600",
    "bg-cyan-700",
    "bg-cyan-800",
    "bg-cyan-900",
  ]);
  const [selectedColors, setSelectedColors]: [string[], (val: string[]) => void] = useState<string[]>([]);
  const handleDelete = (idx: number) => {
    const updatedProducts = products.filter((product) => product.idx !== idx).map((e, idx) => ({ ...e, idx: idx }));
    updateProducts(updatedProducts);
  };

  return (
    <div className="container mx-auto">
      <header className="flex justify-between">
        <h1 className="text-sm-3xl text-2xl font-semibold items-center">Free Courses</h1>
        <Button buttonType="button" className="bg-indigo-700 py-1 relative" width="sm:w-40 w-24" onClick={() => {
          updateData({ ...emptyCard, idx: products.length, isOpen: isOpen, setIsOpen: setIsOpen })
          setUnselectedColors([...selectedColors, ...unselectedColors])
          setSelectedColors([]);
          setIsOpen(true)
        }}>ADD</Button>
      </header>
      <hr className="h-1 my-5 bg-gray-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product}>
            <div className="buttons flex justify-between mt-3">
              <Button buttonType="button" className="bg-indigo-700" onClick={() => {
                updateData(product);
                setSelectedColors(product.colors as string[]);
                setUnselectedColors(unselectedColors.filter((e) => !(product.colors.includes(e))))
                setIsOpen(true);
              }}>Edit</Button>
              <Button buttonType="button" className="bg-red-800" width="w-full" onClick={() => {
                handleDelete(idx);
              }}>delete</Button>
            </div>
          </ProductCard>
        ))}
      </div>
      <MyDialog isOpen={isOpen} setIsOpen={setIsOpen} products={products} updateProducts={updateProducts} cardData={cardData} updateData={updateData} selectedColors={selectedColors} setSelectedColors={setSelectedColors} setUnselectedColors={setUnselectedColors} unselectedColors={unselectedColors}></MyDialog>
    </div>
  );
}

export default App;
