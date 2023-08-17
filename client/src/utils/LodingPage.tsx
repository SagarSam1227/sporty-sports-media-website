import LottieAnimation from "./LoadingAnimation";

function LoadingPage() {
  return (
    <>
      <div
        id="toast-default"
        className="flex items-center w-full mx-[450px] max-w-xs p-4 absolute text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="ml-3 text-sm font-normal">
          <LottieAnimation />
          
          
        </div>
      </div>
    </>
  );
}

export default LoadingPage;
