type Props = {
  title: string;
  description: string;
  amount: number;
  onClose: () => void;
};

export default function EventModal({
  title,
  description,
  amount,
  onClose,
}: Props) {
  const isGain = amount >= 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl p-6 w-80 text-center space-y-4 shadow-xl
        animate-pulse ${
          isGain
            ? "border-2 border-green-400"
            : "border-2 border-red-400"
        }`}
      >
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-gray-700">{description}</p>

        <p
          className={`text-2xl font-bold ${
            isGain ? "text-green-600" : "text-red-600"
          }`}
        >
          {isGain ? "+" : "-"}₹{Math.abs(amount)}
        </p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-black text-white rounded-lg hover:scale-105 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
