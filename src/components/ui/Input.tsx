interface InputProps {
  label: string;
  name: string;
  register: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, register, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        {...register(name)}
        placeholder={label}
        className={`border rounded-2xl px-3 py-2 outline-none focus:outline-none focus:ring-2 focus:ring-red-500 ${error ? "bg-red-100" : "bg-gray-50"}`}
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;