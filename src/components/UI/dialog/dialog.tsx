import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Field, Label, Input, Button, Description } from "@headlessui/react";
import { ICombined, IDialog } from "../../../interfaces/props";
import clsx from "clsx";
import CategoryComboBox from "../comboBox/comboBox";

interface IProps extends IDialog {
  products: ICombined[],
  updateProducts: (val: ICombined[]) => void,
  updateData: (val: ICombined) => void,
  cardData: ICombined,
  setSelectedColors: (val: string[]) => void,
  setUnselectedColors: (val: string[]) => void,
  selectedColors: string[],
  unselectedColors: string[],
}

type onChangeKey = keyof ICombined;

const MyDialog = ({ products, updateProducts, isOpen, setIsOpen, updateData, cardData, selectedColors, setSelectedColors, setUnselectedColors, unselectedColors }: IProps) => {
  const isNew = cardData.colors ? false : true;

  const [errors, setErrors] = useState({
    title: false,
    category: false,
    description: false,
    price: false,
  });

  function close() {
    setIsOpen(false);
    setErrors({ category: false, description: false, price: false, title: false });
    setUnselectedColors([...selectedColors, ...unselectedColors])
    setSelectedColors([]);
  }

  function onChangeFunc<K extends onChangeKey>(key: K, value: ICombined[K]) {
    updateData({ ...cardData, [key]: value });
  }

  const selectColor = (color: string) => {
    const newSelectedColors = [...selectedColors, color];
    setUnselectedColors(unselectedColors.filter((c) => c !== color));
    setSelectedColors(newSelectedColors);
    updateData({ ...cardData, colors: newSelectedColors });
  };

  const deselectColor = (color: string) => {
    const newSelectedColors = selectedColors.filter((c) => c !== color);
    setSelectedColors(newSelectedColors);
    setUnselectedColors([...unselectedColors, color]);
    updateData({ ...cardData, colors: newSelectedColors });
  };

  function validateField() {
    const newErrors = {
      title: cardData.title.length < 3 || cardData.title.length > 100,
      description: cardData.description.length < 10,
      price: Number(cardData.price) < 0,
      category: !cardData.category,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((isValid) => !isValid);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-200 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h2" className="text-base/7 font-bold text-black">
                {isNew ? "ADD New Card" : "Edit Card Data"}
              </DialogTitle>
              <form
                className="mt-4 flex justify-evenly flex-col gap-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (validateField()) {
                    if (isNew) {
                      products.push(cardData);
                      close();
                    } else {
                      products[cardData.idx] = cardData;
                      updateProducts(products);
                      close();
                    }
                  }
                }}
              >
                <div>
                  <Field>
                    <Label className="text-sm/6 font-semibold text-black">
                      * Title
                    </Label>
                    {errors.title ? <Description className="text-sm/3 text-red-700 font-sans">Title must be between 3 and 100 characters long.</Description> : ''}
                    <Input
                      id="title"
                      name="title"
                      value={cardData.title}
                      onChange={(e) => onChangeFunc("title", e.target.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                      )}
                    />
                  </Field>
                </div>
                <div>
                  <Field>
                    <Label className="text-sm/6 font-semibold text-black">
                      * Category
                    </Label>
                    {errors.category ? <Description className="text-sm/3 text-red-700 font-sans">Please select a valid category.</Description> : ''}
                    <div>
                      <CategoryComboBox cardData={cardData} updateData={updateData}></CategoryComboBox>
                    </div>
                  </Field>
                </div>
                <div>
                  <Field>
                    <Label className="text-sm/6 font-semibold text-black">
                      * Description
                    </Label>
                    {errors.description ? <Description className="text-sm/3 text-red-700 font-sans">Description must be at least 10 characters long.</Description> : ''}
                    <Input
                      id="desc"
                      name="desc"
                      value={cardData.description}
                      onChange={(e) =>
                        onChangeFunc("description", e.target.value)
                      }
                      className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                      )}
                    />
                  </Field>
                </div>
                <div>
                  <Field>
                    <Label className="text-sm/6 font-semibold text-black">
                      * Image URL
                    </Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={cardData.srcImage}
                      onChange={(e) => onChangeFunc("srcImage", e.target.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                      )}
                    />
                  </Field>
                </div>
                <div>
                  <Field>
                    <Label className="text-sm/6 font-semibold text-black">
                      Price
                    </Label>
                    {errors.price ? <Description className="text-sm/3 text-red-700 font-sans">Price must be a positive number.</Description> : ''}
                    <Input
                      id="price"
                      name="price"
                      value={cardData.price === "Free" ? "0" : cardData.price as string}
                      onChange={(e) => onChangeFunc("price", e.target.value)}
                      onBlur={(e) => onChangeFunc("isPaid", e.target.value !== "0" && e.target.value !== "" ? true : false)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                      )}
                    />
                  </Field>
                </div>
                <Field>
                  <div className="flex gap-1 mb-4 flex-col">
                    {unselectedColors.length ? <p className="font-semibold">UnSelected:</p> : ''}
                    <div className="flex gap-1 flex-wrap">
                      {unselectedColors.map((color) => (
                        <span
                          key={color}
                          className={`w-6 h-6 rounded-full border-slate-300 border-2 cursor-pointer hover:scale-125 ${color}`}
                          onClick={() => selectColor(color)}
                        ></span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col mt-2">
                    {selectedColors.length ? <p className="font-semibold">selected:</p> : ''}
                    <div className="flex gap-1 flex-wrap">
                      {selectedColors.map((color) => (
                        <span
                          key={color}
                          className={`w-6 h-6 rounded-full border-slate-300 border-2 cursor-pointer hover:scale-125 ${color}`}
                          onClick={() => deselectColor(color)}
                        ></span>
                      ))}
                    </div>
                  </div>
                </Field>
                <div className="flex justify-evenly mt-2">
                  <Button className="flex items-center gap-2 rounded-full bg-gray-500 py-1.5 px-14 text-sm/6 font-bold text-white cursor-pointer" onClick={close}>
                    Close
                  </Button>
                  <Button className="flex items-center gap-2 rounded-full bg-gray-500 py-1.5 px-14 text-sm/6 font-bold text-white cursor-pointer" type="submit">
                    Done
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MyDialog;
