function LineProgressBar({ title, width, progress }) {
  return (
    <div className="w-55 flex flex-col justify-between mb-2">
      <p className="flex justify-between text-base font-medium text-blue-700 dark:text-white">
        {title}
        <span>{progress}%</span>
      </p>

      <div className="w-55 bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
        <div
          className="bg-purple-950 h-2.5 rounded-full"
          style={{ width: width }}
        ></div>
      </div>
    </div>
  );
}

export default LineProgressBar;
