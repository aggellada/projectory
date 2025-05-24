import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function SaveButton({ handleCloseModal }) {
  const { pending, data } = useFormStatus();

  useEffect(() => {
    if (!data && !pending) {
      handleCloseModal();
    }
  }, [data, pending]);

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-purple-700 text-white px-4 py-1 rounded-2xl hover:cursor-pointer"
    >
      {pending ? "Uploading..." : "Save"}
    </button>
  );
}
