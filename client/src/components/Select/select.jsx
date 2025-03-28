import { Controller } from "react-hook-form";

export default function Select({ control, name, options, error, label, rules, watch }) {

  return (
    <div>
      <label className="font-semibold text-sm block mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules} // repasse das regras
        defaultValue="" // valor padrão definido
        render={({ field: { onChange, value, ref } }) => (
          <select
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)} // extraindo o valor do evento
            className="flex items-center rounded-[12px] w-full flex-1 px-4 text-[#828282] py-2 border border-[#828282] bg-[#E8E8E8]"
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
