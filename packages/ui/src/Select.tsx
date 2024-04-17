"use client";

interface OnSelect {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}

export const Select = ({ options, onSelect }: OnSelect) => {
  const OnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };
  return (
    <select
      onChange={OnChangeHandler}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map((option) => (
        <option value={option.key}>{option.value}</option>
      ))}
    </select>
  );
};
