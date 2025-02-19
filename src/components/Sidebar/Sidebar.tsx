import Account from "./Account";
import RouteSelect from "./RouteSelect";

export default function Sidebar() {
    return (
        <div className="">
            <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
                {/* Main sidebar content */}
                <Account />
                {/* <Button text="logout" variant="default" onClick={logout}></Button> */}
                <RouteSelect />
            </div>
        </div>
    )
}