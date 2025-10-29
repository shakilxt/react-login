

export default function InputMain({ label, type, id, placeholder, value, onChange, isRequired = false }) {
    return (
        <div className="flex flex-col space-y-1.5">

            <label className="" htmlFor={label}>{label}{isRequired && <span className="text-red-400"> *</span>}</label>
            <input className="w-full p-4 border border-gray-500 rounded
             focus:outline-2 focus:outline-brand focus:-outline-offset-2"
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />

        </div>
    )
}