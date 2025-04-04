import { IoMdClose } from "react-icons/io";

export default function Read({ closeModal, newsSelected }) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center max-md:w-full">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer max-md:w-full"
        onClick={closeModal}
      />
      <main className="relative z-50 bg-white p-6 rounded-lg w-full h-full max-h-none sm:max-h-[90vh] sm:max-w-2xl sm:mx-4 sm:rounded-lg overflow-y-auto">
        <header className="w-full flex  justify-between">
          <h1 className="text-2xl font-bold mb-4 w-3/4">{newsSelected?.title}</h1>
          <button type="button" onClick={closeModal} className="cursor-pointer">
            <IoMdClose className="text-xl" />
          </button>
        </header>

        <p className="text-md text-gray-600">
          Autor: {newsSelected?.author?.name}
        </p>
        <p className="whitespace-pre-line mb-4">{newsSelected?.content}</p>
      </main>
    </section>
  );
}
