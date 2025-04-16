import { useRouter } from 'next/router';

const UpgradePopup = ({ show, setShow }) => {
  const router = useRouter();

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mehr rausholen?</h2>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed text-base">
          Diese Funktion ist exklusiv für zahlende Nutzer verfügbar.
        </p>
        <p className="mt-3 mb-3">
          <strong>Jetzt upgraden und alle Vorteile genießen.</strong>
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShow(false);
              router.push('/account/subscriptiondetail');
            }}
            className="text-gray-900 font-semibold px-4 py-2 rounded hover:brightness-90 transition"
            style={{ backgroundColor: '#e7fc41' }}
          >
            Jetzt freischalten
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;