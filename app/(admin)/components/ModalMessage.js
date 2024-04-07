export default function ModalMessage({
  message,
  subMessage,
  visible,
  onClose,
}) {
  return (
    <section
      data-visible={visible}
      className="absolute inset-0 grid place-items-center data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto opacity-0 pointer-events-none z-50 backdrop-brightness-90"
    >
      <div className="size-96 bg-white p-8 flex flex-col justify-center items-center rounded-lg ring-1 ring-gray-300 shadow-md">
        <p className="text-xl text-gray-700 font-semibold text-center">
          {message}
        </p>
        <p className="text-sm text-gray-600  text-center mt-1">{subMessage}</p>
        <button
          className="w-48 h-12 bg-yellow-400 rounded-lg font-semibold mt-8"
          onClick={() => onClose()}
        >
          Close message
        </button>
      </div>
    </section>
  );
}
