import ObysApp from "@/components/projects/obys-clone/ObysApp";
import "./globals.css";

export const metadata = {
    title: "Obys Agency Clone",
    description: "A clone of the Awwwards-winning Obys agency site",
};

export default function ObysClonePage() {
    return (
        <div className="obys-clone-wrapper">
            <ObysApp />
        </div>
    );
}
