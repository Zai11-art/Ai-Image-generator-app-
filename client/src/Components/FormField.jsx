function FormField({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) {
    return ( 
        <div>
            <div className="flex items-center gap-2 mb-2 pt-3 text-[white]">
                <label 
                htmlFor={name}
                className="block text-sm font-medium text-[white] "
                >
                {labelName}
                </label>
                {isSurpriseMe && (
                    <button
                    type="button"
                    onClick={handleSurpriseMe}
                    className="font-semidbold text-xs bg-[#3795BD] py-2
                    px-2 rounded-[5px] text-[white]"
                    >Generate Random</button>
                )}
            </div>
            <input type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
            
            className="bg-gray-50 border border-gray-300 text-gray-900
            text-sm rounded-lg focus:ring-[red] focus:border-[red]
            outline-none block w-full p-3 md:w-[300px] w-[200px] "
             />
        </div>
     );
}

export default FormField;