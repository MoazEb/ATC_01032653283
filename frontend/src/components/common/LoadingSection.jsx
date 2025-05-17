import Spinner from "../../assets/svg/Spinner";

export default function LoadingSection() {
    return (
        <div className="text-center p-10 bg-white dark:bg-night-dark dark:border-night-dim rounded-lg border border-gray-200 h-full min-h-[88vh] w-full flex items-center justify-center">
            <Spinner />
        </div>
    );
}
