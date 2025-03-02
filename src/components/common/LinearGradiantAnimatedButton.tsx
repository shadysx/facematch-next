import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type LinearGradiantAnimatedButtonProps = {
    buttonText: string;
    isLoading: boolean;
    loadingText: string;
    onClick: () => void;
    icon?: React.ReactNode;
}

const LinearGradiantAnimatedButton = (props: LinearGradiantAnimatedButtonProps) => {
    const { buttonText, isLoading, loadingText, icon, onClick } = props;

    return (
        <Button
            size="lg"
            onClick={onClick}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                 text-white font-medium py-6 rounded-xl transition-all duration-300 
                 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
        >
            {isLoading ? (
                <>
                    <Loader className="w-5 h-5 animate-spin" />
                    {loadingText}
                </>
            ) : (
                <>
                    {icon}
                    {buttonText}
                </>
            )}
        </Button>
    )
}

export default LinearGradiantAnimatedButton;