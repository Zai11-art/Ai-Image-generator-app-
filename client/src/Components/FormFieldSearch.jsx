function FormFieldSearch({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) {
    return ( 
        <div className="flex flex-col items-center text-[white]">
            <div className="">
                <label 
                htmlFor={name}
                className="block text-[white] mb-4 text-sm font-medium text-lg"
                >
                {labelName}
                </label>
                {isSurpriseMe && (
                    <button
                    type="button"
                    onClick={handleSurpriseMe}
                    className="font-semidbold text-xs bg-[white] py-2
                    px-2 rounded-[5px]"
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
            outline-none block w-full p-3 md:w-[550px] w-[350px]"
             />
        </div>
     );
}

export default FormFieldSearch;