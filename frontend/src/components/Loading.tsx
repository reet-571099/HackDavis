import { ClipLoader } from "react-spinners";

interface LoadingProps {
  fullScreen?: boolean;
  size?: number;
  color?: string;
}

const Loading = ({
  fullScreen = false,
  size = 40,
  color = "#8B5CF6",
}: LoadingProps) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <ClipLoader size={size} color={color} />
        <p className="mt-4 text-purple-600 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
