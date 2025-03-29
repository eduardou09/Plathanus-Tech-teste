

export default function Input({ register, error, ...props }) {
    return (
      <div>
        {props.label && (
          <label className="font-semibold text-sm block mb-1">
            {props.label}
          </label>
        )}
        <input
           defaultValue={""}
          {...register}
          {...props}
          className={`rounded-[12px] w-full px-4 py-2 border ${
            error ? 'border-red-500' : 'border-[#828282]'
          } bg-[#E8E8E8]`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }