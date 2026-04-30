const SelectService = ({
  services,
  setSelectedService,
  selectedService,
  errors,
}) => {
  return (
    <div className="w-full">
      <div className="divide-y  grid grid-cols-1 gap-3  border p-5 shadow rounded-xl w-full">
        <h1 className="font-medium">Select one service *</h1>
        {services.map((s, i) => (
          <div
            key={i}
            className="flex items-center border rounded-lg bg-white cursor-pointer"
            onClick={() => {
              // setSelectedService(s._id);
              setSelectedService((prevService) => {
                // deselect if the same slot is clicked otherwise select new slot
                if (prevService === s._id) {
                  return null;
                }
                return s._id;
              });
            }}
          >
            <input
              checked={selectedService === s._id}
              className="ml-4 w-5 h-5"
              type="checkbox"
            />
            <div className="flex justify-between items-center gap-10 px-3 py-2 w-full">
              <h2 className=" font-medium text-gray-900 text-wrap">{s.name}</h2>
              <p>${s.fee}</p>
            </div>
          </div>
        ))}
        <p className="text-center pt-3 text-red-500 ">{errors?.service}</p>
      </div>
    </div>
  );
};

export default SelectService;
