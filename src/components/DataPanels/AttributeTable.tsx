import { useParcelStore } from "../../stores/parcelStore";

export default function AttributeTable() {
  const selected = useParcelStore((s) => s.selectedParcel);

  if (!selected) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-gray-300 shadow-lg dark:bg-slate-800 dark:border-slate-600">
      <h3 className="mb-2 font-bold text-gray-800 text-md dark:text-white">Parcel Attributes</h3>
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(selected).map(([key, value]) => (
            <tr key={key} className="border-b border-gray-200 dark:border-slate-700">
              <td className="py-1 pr-4 font-semibold capitalize">{key}</td>
              <td className="py-1 text-gray-600 dark:text-white">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
