import { useMemo } from "react";
import useSearchBox from "@/app/_hooks/useSearchBox";

function ModalView() {
  const { results, modalIndex, setModalIndex } = useSearchBox();

  const isPrevImageAvailable = useMemo(() => {
    if (modalIndex === undefined) return false;
    return modalIndex - 1 >= 0;
  }, [modalIndex]);

  const isNextImageAvailable = useMemo(() => {
    if (modalIndex === undefined) return false;
    return modalIndex + 1 < results.length;
  }, [modalIndex, results.length]);

  const currentImg = useMemo(() => {
    if (modalIndex === undefined) return null;
    return results[modalIndex];
  }, [modalIndex, results]);

  function closeModal() {
    setModalIndex(undefined);
  }

  function nextImage() {
    if (modalIndex === undefined) return;
    setModalIndex(modalIndex + 1);
  }

  function prevImage() {
    if (modalIndex === undefined) return;
    setModalIndex(modalIndex - 1);
  }

  if (!currentImg) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 ">
      <div className="relative h-[80vh] max-h-[800px] w-[90vw] max-w-[400px]">
        <button
          className="absolute top-2 right-2 bg-white text-black p-2 rounded"
          onClick={closeModal}
        >
          close
        </button>
        <img className="object-cover flex w-full h-full" src={currentImg} />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 flex justify-between items-center">
          <button onClick={prevImage} disabled={!isPrevImageAvailable}>
            Previous
          </button>
          <button onClick={nextImage} disabled={!isNextImageAvailable}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalView;
