function AddBtn({ setIsAddGoalShowing }) {
  return (
    <div
      className="w-full bg-white h-17 md:h-22 p-4 rounded-lg shadow-lg flex justify-between items-center fixed bottom-0 md:absolute md:-bottom-8 cursor-pointer "
      onClick={() => setIsAddGoalShowing(true)}
    >
      <div className="flex-1">
        <p className="text-gray-500 text-sm  max-w-60 flex flex-col">
          Click to add Goal.
          <span>Long press on goal to delete</span>
        </p>
      </div>

      <button className="bg-pink-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer ">
        <img
          src="/src/assets/add-btn.svg"
          alt="plus Icon"
          className="w-12 h-12"
        />
      </button>
    </div>
  );
}

export default AddBtn;
