import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Disclosure, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { ReactNode, PropsWithChildren } from 'react';

interface DropdownCardProps {
    open: boolean;
    onClick: () => void;
    title: ReactNode;
}
export default function DropdownCard({ open, onClick, title, children }: PropsWithChildren<DropdownCardProps>) {
return (
    <div className="mt-8 rounded-lg bg-white shadow-lg">
      <Disclosure>
        <Disclosure.Button
          className={twMerge(
            'flex w-full items-center justify-between border-gray-200 px-4 py-5 sm:px-6',
            'border-b'
          )}
          onClick={onClick}>
          <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
          <ChevronRightIcon className={twMerge('h-6 w-6 text-gray-400', open && 'rotate-90')} />
        </Disclosure.Button>
        <Transition
          show={open}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0">
          <Disclosure.Panel static>
            {children}
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
)
}