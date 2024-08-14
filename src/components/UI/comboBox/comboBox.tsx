import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { ICombined } from '../../../interfaces/props'

const courseCategories: { name: string, id: number }[] = [
    { id: 1, name: 'Courses' },
    { id: 2, name: 'Lessons' },
    { id: 3, name: 'Assignments' },
    { id: 4, name: 'Quizzes' },
    { id: 5, name: 'Resources' },
    { id: 6, name: 'Discussions' },
    { id: 7, name: 'Announcements' },
    { id: 8, name: 'Grades' },
    { id: 9, name: 'Certificates' },
    { id: 10, name: 'FAQs' },
    { id: 12, name: 'Surveys' },
]

interface IProps {
    updateData: (val: ICombined) => void,
    cardData: ICombined,
}


export default function CategoryComboBox({ cardData, updateData }: IProps) {

    type onChangeKey = keyof ICombined;

    function onChangeFunc<K extends onChangeKey>(key: K, value: ICombined[K]) {
        updateData({ ...cardData, [key]: value });
    }

    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<{ name: string, id: number } | null>(courseCategories.filter((e) => e.name === cardData.category)[0] || courseCategories[0])

    const filteredPeople =
        query === ''
            ? courseCategories
            : courseCategories.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className="mx-auto w-auto h-10 pt-2">
            <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
                <div className="relative">
                    <ComboboxInput
                        id='category'
                        name='category'
                        onBlur={() => onChangeFunc('category', courseCategories[(selected?.id || 1) - 1].name)}
                        className={clsx(
                            'w-full rounded-lg border-none bg-black/5 py-1.5 pr-8 pl-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                        displayValue={(person: { name: string, id: number } | null) => person?.name ?? ''}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'relative z-20 w-[var(--input-width)] h-40 overflow-y-auto rounded-xl border border-black/20 bg-gray-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {filteredPeople.map((person) => (
                        <ComboboxOption
                            key={person.id}
                            value={person}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
                        >
                            <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                            <div className="text-sm/6 text-black">{person.name}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}
